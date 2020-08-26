import { NextApiRequest, NextApiResponse } from 'next'


const HTTP_OK = 200;
const HTTP_BAD_REQUEST = 400;
const HTTP_METHOD_NOT_ALLOWED = 405;
const HTTP_UNPROCESSABLE_ENTITY = 422;


const searchGithubRepo = (text: String) => {
  // https://api.github.com/search/repositories?q=django
};

const searchGithubUsers = (text: String) => {
  // https://api.github.com/search/users?q=django
};


const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  if (_req.method != 'POST') {
    res.status(HTTP_METHOD_NOT_ALLOWED).json({
      detail: 'This API expects only POST requests'
    })
  } else {
    try {
      const payload = _req.body;
      if (!payload.searchType || !payload.searchText) {
        res.status(HTTP_BAD_REQUEST).json({detail: 'Invalid payload'});
      } else {
        res.status(HTTP_OK).json({found: true})
      }
    } catch (err) {
      console.error('Cannot process: ' + _req.body);
      res.status(HTTP_UNPROCESSABLE_ENTITY).json({detail: 'This API expects json payload'})
    }
  }
};


export default handler;