import some from 'lodash/some';

export const stringToBool = (value: string) => {
    return some(['true', 't', '1', 'on', 'enabled'], (val) => val === value.toLowerCase());
};

// Caching
export const CACHE_ENGINE = process.env.CACHE_ENGINE || 'redis';
export const CACHE_HOST = process.env.REDIS_HOST || '127.0.0.1';
export const CACHE_PORT = parseInt(process.env.REDIS_PORT || '6379');
export const CACHE_MAX_CONN = parseInt(process.env.REDIS_MAX_CONN || '10');
export const CACHE_MIN_CONN = parseInt(process.env.CACHE_MIN_CONN || '3');
export const CACHE_TTL = parseInt(process.env.CACHE_TTL || '7200');
export const CACHE_ENABLED = stringToBool(process.env.CACHE_ENABLED || '1');

// Github client configuration
export const GITHUB_USE_FAKE_CLIENT = stringToBool(process.env.GITHUB_USE_FAKE_CLIENT || '0');

// Search configuration
export const MINIMUM_SEARCH_TERM_LENGTH = 3;
