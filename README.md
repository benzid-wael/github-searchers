# Github searchers 

This is my solution for [Tradeling](https://www.tradeling.com/) Full-stack [coding task](https://github.com/tradeling/coding-tasks/blob/develop/fullstack-javascript/readme.md)
The goal is to build a SPA that allows users to search for specific users or repositories.
The solution uses Github Search API to execute users' queries.


## Pre-requisite
- redis `v6.0.6`


## Try it yourself
This project is already deployed in the cloud using [Vercel](https://vercel.com)
You can access latest version [here](https://github-searchers-vercel.app)

P.S. This deployment is using fake github client for demo purpose. You need to install the project locally to see results from Github Search API. You can force using the real client by setting `GITHUB_USE_FAKE_CLIENT` to `0`

You can check the API documentation [here](github-searchers.vercel.app/_apidoc)


## Installation

To install this project in your machine, you need first to clone the project using `git` command.
Once project is cloned, head to `github-searchers` directory and install dependencies

```bash
$ yarn
```

Once all dependencies are installed, you can run the project using this command
```bash
$ yarn dev
```

## Solution
### Backend
The search api fetch results from github if and only if the result is not available in cache. This is achived by decorating the respective method with the `cache` decorator

`/api/clear-cache` clear the cache by calling the `flushdb` redis command. This is assuming that we don't have any other data in the same redis db. This is the recommended way as running `KEYS` or `SCAN` command is not recommended in production. However, I implemented `delKeysStartsWith` api which able to delete keys starting with given prefix

### Frontend
I created a generic `FlexGrid` to present the search results. This component is responsive and can work properly in different screens. Even this was not mentionned in the requirement, but I belive this is a better approach.

Github serach results is stored is redux, under `user` or `repository` namespace. As the schema is the same, I created a generic slice maker.

#### Search Flow
1. user initiate search
2. Update `search` namespace with user query
3.a. If the result is already cached, return it from the store
3.b. Otherwise, fetch the data from the search API
4. Once the backend respond, check the `search` state
5. Update the related search result history, aka `user` or `repository` namespace
6. If the response matches the latest search request, update the search result: `search` namespace


## Features
### Done
- Integration with Github Search API
- Search Results are cached for 2h by default, you can customize by updating `CACHE_TTL` environment variable
- Supported Github entities: users and repositories

### TODO
1. Persist search results in local storage using `redux-persist`
2. Extract loader to its own component
3. Add support for pagination
4. Support other Github entities
5. Improve interface for `apiResponse` middleware
6. Add support of dynamic cache key prefix to prevent clearing the cache using `delKeyStartsWith` method
7. Using Github streaming API in the background, and feed search result from database
8. Run unit tests as part of CI/CD, see this [issue](https://github.com/vercel/vercel/discussions/5140)


## Known Bugs
You can see list of all open issues [here](https://github.com/benzid-wael/github-searchers/issues/)

