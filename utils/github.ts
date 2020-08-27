import User from '../shared/user/user';
import Repository from '../shared/repository/repository';
import sampleUsersData from './users';
import sampleRepoData from './repo';


export type GithubEntityType = 'users' | 'repositories';


export interface MetaInfo {
  total: number;
  previousPage: number|null;
  nextPage: number|null;
  totalPages: number;
}

interface GenericApiResponse {
  response: any;
  previousPage: number|null;
  nextPage: number|null;
  totalPages: number;
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

  findRepositories = async (text: string, page: number=1): Promise<SearchResult<Repository>> => {
    const resp = await this._search('repositories', text, page);
    const response = resp.response;
    return {
      meta: {
        total: response.total_count,
        previousPage: resp.previousPage,
        nextPage: resp.nextPage,
        totalPages: resp.totalPages
      },
      items: response.body.items.map(item => (<Repository>{
        name: item.name,
        repositoryUrl: item.html_url,
        createdAt: item.created_at,
        forksCount: item.forks_count,
        openIssuesCount: item.open_issues_count,
        watchers: item.watchers,
        stars: item.stargazers_count,
        author: {
          name: item.author.login,
          avatarUrl: item.author.avatar_url,
          url: item.author.html_url
        }
      }))
    }
  };

  findUsers = async (text: string, page: number=1): Promise<SearchResult<User>> => {
    const resp = await this._search('repositories', text, page);
    const response = resp.response;
    return {
      meta: {
        total: response.total_count,
        previousPage: resp.previousPage,
        nextPage: resp.nextPage,
        totalPages: resp.totalPages
      },
      items: response.body.items.map(item => (<User>{
        name: item.login,
        avatarUrl: item.avatar_url,
        url: item.html_url
      }))
    }
  }
}


export class FakeGithubClient extends BaseGithubClient {

  // @ts-ignore
  _search = async (type: GithubEntityType, text: string, page: number): Promise<GenericApiResponse> => {
    const body = type === 'users' ? sampleUsersData : sampleRepoData;
    const totalPages = 3;
    return {
      response: body,
      previousPage: page > 1 ? (page - 1) : null,
      nextPage: page < totalPages ? (page + 1): null,
      totalPages: totalPages
    }
  };
}

