import { NextApiRequest, NextApiResponse } from 'next'

import { InvalidPayload } from '../../utils/errors';
import sampleUsersData from '../../utils/users';
import {sampleData as sampleRepoData} from '../../utils/repo';
import apiResponse from '../../utils/api';


const MINIMUM_SEARCH_TERM_LENGTH = 3;
const searchGithubRepo = (text: String) => {
  // https://api.github.com/search/repositories?q=django
  if (text && text.length >= MINIMUM_SEARCH_TERM_LENGTH) {
    return sampleRepoData;
  } else {
    return {}
  }
};

const searchGithubUsers = (text: String) => {
  // https://api.github.com/search/users?q=django
  if (text && text.length >= MINIMUM_SEARCH_TERM_LENGTH) {
    return sampleUsersData;
  } else {
    return {}
  }
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





const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  const payload = _req.body;
  const result = SEARCH_MODE_MAPPINGS[payload.searchType](payload.searchText);
  res.status(200).json(result);
};


export default apiResponse(["POST"], validatePayload)(handler);