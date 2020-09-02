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

    it('delKeysStartingWith should call Tedis.command', async () => {
        // given
        const mock = jest.fn();
        // @ts-ignore
        (TedisPool as jest.Mock<TedisPool>).mockImplementation(() => ({ getTedis: () => Promise.resolve({ command: mock }) }));
        const testee = new RedisCacheStorage('127.0.0.1', 6379);
        // when
        await testee.delKeysStartingWith('github');
        // then
        const call = mock.mock.calls[0];
        expect(call[0]).toEqual('EVAL');  // Check that we are using EVAL command
        expect(call[call.length - 1]).toEqual('github:*');  // Check that we provided correct prefix
    })
})