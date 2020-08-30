import { TedisPool } from "tedis";


const tedisPool = new TedisPool({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '6379'),
  max_conn: parseInt(process.env.REDIS_MAX_CONN || '5')
});


export const getRedisClient = async () => {
    return await tedisPool.getTedis();
};