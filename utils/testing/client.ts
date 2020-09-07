import { createServer } from 'http';
import { NextApiHandler } from 'next';
import { apiResolver } from 'next/dist/next-server/server/api-utils';
import request from 'supertest';

export const Client = async (handler: NextApiHandler, { host = 'example.com' }: { host?: string } = {}) =>
    request(
        createServer(async (req, res) => {
            req.headers.host = host;

            return apiResolver(req, res, undefined, handler, {} as any, true);
        }),
    );
