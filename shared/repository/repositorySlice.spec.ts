import { addSearchResult } from './repositorySlice';
import store from '../../store/store';
import { mockRepositorySearchResult } from "../../utils/testing";


test('addSearchResult: adds new entry to repository search history', () => {
    // given
    const result = mockRepositorySearchResult();
    // when
    store.dispatch(addSearchResult({ searchText: "GithubSearchers", result }));
    // then
    expect((<any>store.getState().repository)["GithubSearchers"]).toBe(result);
});