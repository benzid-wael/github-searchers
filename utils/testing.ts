import { NextApiRequest, NextApiResponse } from 'next';
import User from '../shared/user/user';
import Repository from '../shared/repository/repository';
import { SearchResult } from './backend/github';
import { cache } from './backend/api';


export const mockRequest = ({method, json, headers}: {method?: string, json?: any, headers?: any}) => {
  return {
    method: method || 'GET',
    body: json || {},
    headers: headers || {}
  } as NextApiRequest
};


export const mockResponse = () => {
  const res = { } as NextApiResponse;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};


export const mockUser = ({name, avatarUrl, url}: {name?: string, avatarUrl?: string, url?: string}): User => {
  const user: User = {
    name: name || 'John Doe',
    url: url || 'https://github.com/benzid-wael/',
    avatarUrl: avatarUrl || 'https://avatars0.githubusercontent.com/u/4288931?s=60&v=4'
  };
  return user;
};


export const mockRepository = (): Repository => {
  return {
    name: 'Github Searchers',
    repositoryUrl: 'https://github.com/benzid-wael/github-searchers',
    author: {
      name: 'John Doe',
      url: 'https://github.com/benzid-wael/',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/4288931?s=60&v=4'
    },
  } as Repository;
};


export const mockUserSearchResult = (): SearchResult<User> => {
  return {
    meta: {
      total: 1,
      prev: null,
      next: null,
      last: 1
    },
    items: [
        mockUser({})
    ]
  }
};


export const mockRepositorySearchResult = (): SearchResult<Repository> => {
  return {
    meta: {
      total: 1,
      prev: null,
      next: null,
      last: 1
    },
    items: [
        mockRepository()
    ]
  }
};


export class FakeJsonLogger {

  // @ts-ignore
  @cache({ prefix: 'test', version: 1 })
  log(message: string, error?: string) {
    if (error) {
      throw new Error(error);
    }

    return {message: message}
  }

}