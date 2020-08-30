import User from '../../shared/user/user';
import Repository from '../../shared/repository/repository';
import { getRedisClient } from "./cache";
import { RateLimitReached } from "../errors";
import sampleUsersData from '../users';
import sampleRepoData from '../repo';


export type GithubEntityType = 'users' | 'repositories';


interface PaginationMeta {
  first?: number|null;
  prev: number|null;
  next: number|null;
  last: number|null;
}

export interface MetaInfo extends PaginationMeta {
  total: number;
}

interface GenericApiResponse extends PaginationMeta {
  response: any;
}

export interface SearchResult<T> {
  meta: MetaInfo;
  items: Array<T>;
}


abstract class BaseGithubClient {
  /*
   * Search for given items using Github search API
   *
   * @param type  github object type
   * @param text  search keyword
   */
  abstract _search: (type: GithubEntityType, text: string, page: number) => Promise<GenericApiResponse>;

  /*
   *
   * Find Github repositories matching your search text
   */
  findRepositories = async (text: string, page: number=1): Promise<SearchResult<Repository>> => {
    const resp = await this._search('repositories', text, page);
    const response = resp.response;
    return {
      meta: {
        total: response.total_count,
        first: resp.first || null,
        prev: resp.prev || null,
        next: resp.next || null,
        last: resp.last || null
      },
      items: response.items.map(item => ({
        name: item.name,
        repositoryUrl: item.html_url,
        createdAt: item.created_at,
        forksCount: item.forks_count,
        openIssuesCount: item.open_issues_count,
        watchers: item.watchers,
        stars: item.stargazers_count,
        author: {
          name: item.owner.login,
          avatarUrl: item.owner.avatar_url,
          url: item.owner.html_url
        }
      }))
    }
  };

  /*
   *
   * Find Github users matching your search text
   */
  findUsers = async (text: string, page: number=1): Promise<SearchResult<User>> => {
    const resp = await this._search('users', text, page);
    const response = resp.response;
    const users: User[] = response.items.map(item => {
      return {
        name: item.login,
        avatarUrl: item.avatar_url,
        url: item.html_url
      }
    });
    return {
      meta: {
        total: response.total_count,
        first: resp.first || null,
        prev: resp.prev || null,
        next: resp.next || null,
        last: resp.last || null
      },
      items: users
    }
  }
}


export class GithubClient extends BaseGithubClient {

  extractPageInfo = (header: string): PaginationMeta => {
      const links = header.split(',');
      return links.reduce((acc, cur) => {
        const link = /<([^>]+)>;\s+rel="([^"]+)"/ig.exec(cur);

        if(!link) return acc;

        const url = new URL(link[1]);
        const page = url.searchParams.get('page')
        acc[link[2]] = page ? parseInt(page): null;
        return acc;
      }, {}) as PaginationMeta;
  };

  _fetch = async (type: GithubEntityType, text: string, page: number): Promise<any> => {
    let url = new URL(`https://api.github.com/search/${type}`);
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json'
    };
    const params = {
      page: page.toString(),
      query: text,
      per_page: '25'  // TODO make it variable
    };
    url.search = new URLSearchParams(params).toString();
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: headers
    });

    // Github return 403 when rate limit exceeded
    if(response.status === 403) {
      throw new RateLimitReached('Too many requests. Try after 10 minutes.');
    } else if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    return response;
  };

  // @ts-ignore
  _search = async (type: GithubEntityType, text: string, page: number): Promise<GenericApiResponse> => {
    const cacheKey = `github:${type.toLowerCase()}:${text.toLowerCase().replace(' ', '-')}:${page}`;
    const redis = await getRedisClient();
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached as string);
    }

    const response = await this._fetch(type, text, page);
    const body = await response.json();

    const result = {
      response: body,
      ...this.extractPageInfo(response.headers.get('link') || '')
    };

    await redis.set(cacheKey, JSON.stringify(result));
    return result;
  };
}


export class FakeGithubClient extends BaseGithubClient {

  // @ts-ignore
  _search = async (type: GithubEntityType, text: string, page: number): Promise<GenericApiResponse> => {
    const body = type === 'users' ? sampleUsersData : sampleRepoData;
    const totalPages = 3;
    return {
      response: body,
      prev: page > 1 ? (page - 1) : null,
      next: page < totalPages ? (page + 1): null,
      last: totalPages
    }
  };
}


export class GithubClientFactory {
  static get client() {
    if (process.env.USE_FAKE_CLIENT && process.env.USE_FAKE_CLIENT == '1') {
      return new FakeGithubClient();
    }
    return new GithubClient();
  }
}
