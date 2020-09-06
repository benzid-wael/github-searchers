import { NextApiRequest, NextApiResponse } from 'next';
import { CACHE_HOST, CACHE_PORT } from '../../shared/config';
import { RedisCacheStorage } from '../../utils/backend/cache';
import apiResponse from '../../utils/backend/api';

export const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    const cache = new RedisCacheStorage(CACHE_HOST, CACHE_PORT);
    await cache.flushdb();
    return res.status(200).json({ status: 'ok' });
};

export default apiResponse(['DELETE'])(handler);
