import { addSearchResult } from './userSlice';
import store from '../../store/store';


test('addSearchResult: adds new entry to user search history', () => {
    // given
    const result = {
      "meta": {
        "total": 1,
        "previousPage": null,
        "nextPage": null,
        "totalPages": 1
      },
      "items": [{
        "name": "Wael Ben Zid El Guebsi",
        "url": "https://github.com/benzid-wael/",
        "avatarUrl": "https://avatars0.githubusercontent.com/u/4288931?s=60&v=4"
      }]
    };
    // when
    store.dispatch(addSearchResult({ searchText: "Wael", result }));
    // then
    expect((<any>store.getState().user)["Wael"]).toBe(result);
});