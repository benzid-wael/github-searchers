import { TedisPool } from 'tedis';

import { CACHE_MAX_CONN, CACHE_MIN_CONN } from '../../shared/config';


export abstract class CacheStorage {
  constructor(protected host: string, protected port: number, protected options?: any) {
  }

  abstract get(key: string);
  abstract set(key: string, value: any, timeout?: number);
  abstract del(key: string);
  abstract flushdb(key: string);
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
    return typeof result === 'string' ? JSON.parse(result) : null;
  }

  async set(key: string, value: any, timeout?: number) {
    const client = await this.getClient();
    const serializedValue = JSON.stringify(value);
    if (timeout) {
      return await client.setex(key, timeout, serializedValue);
    } else {
      return await client.set(key, serializedValue);
    }
  }

  async flushdb() {
    const client = await this.getClient();
    return await client.command('flushdb')
  }

  /*
   * Delete keys starting with the given prefix
   */
  async delKeysStartingWith(prefix: string, sep?: string) {
    const seperator = sep || ':';
    const client = await this.getClient();
    // Since Redis v2.6, we can run lua script
    const script = `
local cursor = 0
local calls = 0
local dels = 0
repeat
    local result = redis.call('SCAN', cursor, 'MATCH', ARGV[1])
    calls = calls + 1
    for _,key in ipairs(result[2]) do
        redis.call('DEL', key)
        dels = dels + 1
    end
    cursor = tonumber(result[1])
until cursor == 0
return "Calls " .. calls .. " Dels " .. dels
    `
    const command = [
      'EVAL',
      script,
      0,
      `${prefix}${seperator}*`,
    ];
    return await client.command(...command);
  }

  async del(key: string) {
    const client = await this.getClient();
    return await client.del(key);
  }
}


export default RedisCacheStorage;