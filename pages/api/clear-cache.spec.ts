import { handler } from './clear-cache';
import { CACHE_HOST, CACHE_PORT } from '../../shared/config';
import { RedisCacheStorage } from '../../utils/backend/cache';
import { mockRequest, mockResponse } from "../../utils/testing";


describe('clear-cache endpoint', () => {
    it('should flushes cache db', async () => {
        // given
        const redis = new RedisCacheStorage(CACHE_HOST, CACHE_PORT);
        await redis.set('hello', 'world', 99);
        const req = mockRequest({ method: 'DELETE' });
        const res = mockResponse();
        // when
        await handler(req, res);
        // then
        expect(await redis.get('hello')).toBeNull();
    })
})