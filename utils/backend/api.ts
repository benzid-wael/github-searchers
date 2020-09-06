import { NextApiRequest, NextApiResponse } from 'next';

import { RedisCacheStorage } from './cache';
import { ApiError, MethodNotAllowed } from '../errors';
import { CACHE_HOST, CACHE_PORT, CACHE_TTL } from '../../shared/config';

export type HTTP_METHOD = 'HEAD' | 'GET' | 'POST' | 'PUT' | 'DELETE';

export const handleError = (res, err) => {
    if (err instanceof ApiError) {
        res.status(err.status).json({ detail: err.message });
    } else {
        res.status(500).json({ detail: err.toString() });
    }
};

/*
 *
 * Decorator to validate API calls, and to normalize API errors
 *
 * This decorator will prforme some checks, including:
 * 1. valid HTTP method, returns Method Not Allowed for invalid request
 * 2. validate request's body iff validator callback is provided
 */
export const apiResponse = (allowedMethods: HTTP_METHOD[], validator?: (payload: any) => void) => {
    const wrapper = (handler) => {
        return (req: NextApiRequest, res: NextApiResponse) => {
            try {
                // Check http method
                if (!req.method || allowedMethods.indexOf(<HTTP_METHOD>req.method) < 0) {
                    throw new MethodNotAllowed(`Allowed methods: ${allowedMethods.join(', ')}`);
                }
                // Validate request payload
                if (validator) {
                    const payload = req.body;
                    validator(payload);
                }
                // Execute
                handler(req, res).catch((err) => {
                    handleError(res, err);
                });
            } catch (err) {
                handleError(res, err);
            }
        };
    };

    return wrapper;
};

/*
 *
 * Decorator for views that tries getting the response from the cache and
 * populates the cache if the result isn't in the cache yet.
 *
 * The cache is keyed by the used argument to call the decorated view.
 * Additionally, there is a `prefix` that is used to differentiate different cache types
 *
 * @param   prefix    cache key's prefix
 * @param   timeout   cache TTL
 * @param   version   cache's version
 */
export const cache = ({
    prefix,
    timeout,
    version,
    enable,
}: {
    prefix: string;
    timeout?: number;
    version?: number;
    enable?: boolean;
}) => {
    timeout = timeout === undefined ? CACHE_TTL : timeout;
    version = version || 1;
    const enabled = enable === undefined ? true : enable;

    const wrapper = (
        target: any,
        // @ts-ignore
        propertyKey: string,
        descriptor: TypedPropertyDescriptor<(...params: any[]) => Promise<any>>,
    ) => {
        const originalMethod = descriptor.value;

        if (!originalMethod) {
            throw new SyntaxError(`cache decorator supports only methods`);
        }

        if (!enabled) {
            return originalMethod;
        }

        descriptor.value = async (...args) => {
            const cacheKey = `${prefix}:${version}:${args.map((arg) => arg.toString()).join(':')}`.toLowerCase();
            const cacheStorage = new RedisCacheStorage(CACHE_HOST, CACHE_PORT);
            const cached = await cacheStorage.get(cacheKey);

            if (cached) {
                return cached;
            }

            const result = await originalMethod.apply(target, args);

            await cacheStorage.set(cacheKey, result, timeout);
            return result;
        };

        return descriptor;
    };

    return wrapper;
};

export default apiResponse;
