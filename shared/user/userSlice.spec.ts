import { addSearchResult } from './userSlice';
import store from '../../store/store';
import { mockUserSearchResult } from "../../utils/testing";


test('addSearchResult: adds new entry to user search history', () => {
    // given
    const result = mockUserSearchResult();
    // when
    store.dispatch(addSearchResult({ searchText: "Wael", result }));
    // then
    expect((<any>store.getState().user)["Wael"]).toBe(result);
});