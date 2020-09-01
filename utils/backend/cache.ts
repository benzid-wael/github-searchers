import { TedisPool } from 'tedis';

import { CACHE_MAX_CONN, CACHE_MIN_CONN } from '../../shared/config';

export abstract class CacheStorage {
  constructor(protected host: string, protected port: number, protected options?: any) {
  }

  abstract get(key: string);
  abstract set(key: string, value: any, timeout?: number);
  abstract del(key: string);
}


export class RedisCacheStorage extends CacheStorage {
  pool: TedisPool;

  constructor(host: string, port: number, options?: any) {
    super(host, port, options);
    this.pool = new TedisPool({
      host: host,
      port: port,
      max_conn: options?.max_conn || CACHE_MAX_CONN,
      min_conn: options?.min_conn || CACHE_MIN_CONN,
    });
  }

  async getClient() {
    return await this.pool.getTedis();
  }

  async get(key: string) {
    let result: any | null = null;
    const client = await this.getClient();
    result = await client.get(key);
    return typeof result == 'string' ? JSON.parse(result) : result;
    return result;
  }

  async set(key: string, value: any, timeout?: number) {
    const client = await this.getClient();
    const serializedValue = JSON.stringify(value);
    if (timeout) {
      return await client.psetex(key, timeout, serializedValue);
    } else {
      return await client.set(key, serializedValue);
    }
  }

  async del(key: string) {
    const client = await this.getClient();
    return await client.del(key);
  }
}


export default RedisCacheStorage;