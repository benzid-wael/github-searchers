import { TedisPool } from 'tedis';

import { handler } from './clear-cache';
import { CACHE_HOST, CACHE_PORT } from '../../shared/config';
import { RedisCacheStorage } from '../../utils/backend/cache';
import { mockRequest, mockResponse } from "../../utils/testing";


jest.mock('tedis');


describe('clear-cache endpoint', () => {
    it('should flushes cache db', async () => {
        // given
        const mock = jest.fn();
        // @ts-ignore
        (TedisPool as jest.Mock<TedisPool>).mockImplementation(() => ({ getTedis: () => Promise.resolve({ command: mock }) }));

        const redis = new RedisCacheStorage(CACHE_HOST, CACHE_PORT);
        const req = mockRequest({ method: 'DELETE' });
        const res = mockResponse();
        // when
        await handler(req, res);
        // then
        expect(mock).toHaveBeenCalledWith('flushdb');
    })
})