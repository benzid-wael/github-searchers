import { TedisPool } from 'tedis';
import { RedisCacheStorage } from './cache';


jest.mock('tedis');


describe('RedisCacheStorage', () => {
    it('getClient should call getTedis method', () => {
        // given
        const mockGetTedis = jest.fn();
        TedisPool.prototype.getTedis = mockGetTedis;
        const testee = new RedisCacheStorage('127.0.0.1', 6379);
        // when
        testee.getClient();
        // then
        expect(mockGetTedis).toHaveBeenCalled();
    })

    it('get should call Tedis.get', async () => {
        // given
        const mock = jest.fn();
        // @ts-ignore
        (TedisPool as jest.Mock<TedisPool>).mockImplementation(() => ({ getTedis: () => Promise.resolve({ get: mock }) }));
        const testee = new RedisCacheStorage('127.0.0.1', 6379);
        // when
        await testee.get('someKey');
        // then
        expect(mock).toHaveBeenCalled();
    })

    it('set should call Tedis.set', async () => {
        // given
        const mock = jest.fn();
        // @ts-ignore
        (TedisPool as jest.Mock<TedisPool>).mockImplementation(() => ({ getTedis: () => Promise.resolve({ set: mock }) }));
        const testee = new RedisCacheStorage('127.0.0.1', 6379);
        // when
        await testee.set('someKey', 2);
        // then
        expect(mock).toHaveBeenCalled();
    })

    it('del should call Tedis.del', async () => {
        // given
        const mock = jest.fn();
        // @ts-ignore
        (TedisPool as jest.Mock<TedisPool>).mockImplementation(() => ({ getTedis: () => Promise.resolve({ del: mock }) }));
        const testee = new RedisCacheStorage('127.0.0.1', 6379);
        // when
        await testee.del('someKey');
        // then
        expect(mock).toHaveBeenCalled();
    })
})