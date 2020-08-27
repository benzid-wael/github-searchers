import { NextApiRequest, NextApiResponse } from 'next'

import { InvalidPayload, PreconditionFailed } from '../../utils/errors';
import apiResponse from '../../utils/api';
import { GithubClientFactory } from '../../utils/github';


const MINIMUM_SEARCH_TERM_LENGTH = 3;
const searchGithubRepo = async (searchText: string) => {
  // https://api.github.com/search/repositories?q=django
  const client = GithubClientFactory.client;
  if (searchText && searchText.length >= MINIMUM_SEARCH_TERM_LENGTH) {
    return await client.findRepositories(searchText);
  }
  throw new PreconditionFailed(`This API expects a search query with at least ${MINIMUM_SEARCH_TERM_LENGTH} characters`);
};

const searchGithubUsers = async (searchText: string) => {
  // https://api.github.com/search/users?q=django
  const client = GithubClientFactory.client;
  if (searchText && searchText.length >= MINIMUM_SEARCH_TERM_LENGTH) {
    return await client.findUsers(searchText);
  }
  throw new PreconditionFailed(`This API expects a search query with at least ${MINIMUM_SEARCH_TERM_LENGTH} characters`);
};


const SEARCH_MODE_MAPPINGS: {[key: string]: (value: string) => any} = {
  "repository": searchGithubRepo,
  "user": searchGithubUsers,
};


const validatePayload = (payload: {searchType: string, searchText: string}) => {
  if (!payload.searchType || !payload.searchText) {
    throw new InvalidPayload('Invalid schema');
  }
  if (!SEARCH_MODE_MAPPINGS[payload.searchType]) {
    throw new InvalidPayload('Unsupported search type: ' + payload.searchType);
  }
};





const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const payload = _req.body;
  const searchCallback = SEARCH_MODE_MAPPINGS[payload.searchType];
  const result = await searchCallback(payload.searchText);
  res.status(200).json(result);
};


export default apiResponse(["POST"], validatePayload)(handler);