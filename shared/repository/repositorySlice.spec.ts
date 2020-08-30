import { addSearchResult } from './repositorySlice';
import store from '../../store/store';


test('addSearchResult: adds new entry to repository search history', () => {
    // given
    const result = {
      "meta": {
        "total": 1,
        "previousPage": null,
        "nextPage": null,
        "totalPages": 1
      },
      "items": [{
        "name": "Github Searchers",
        "repositoryUrl": "https://github.com/benzid-wael/github-searchers",
        "author": {
          "name": "Wael Ben Zid El Guebsi",
          "url": "https://github.com/benzid-wael/",
          "avatarUrl": "https://avatars0.githubusercontent.com/u/4288931?s=60&v=4"
        },
      }]
    };
    // when
    store.dispatch(addSearchResult({ searchText: "GithubSearchers", result }));
    // then
    expect((<any>store.getState().repository)["GithubSearchers"]).toBe(result);
});