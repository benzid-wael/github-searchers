import { FetchMock } from "jest-fetch-mock";

import { resetSearch, search, searchResultFailed, searchResultLoaded, startSearching } from './searchSlice';
import store from '../../store/store';
import { mockUserSearchResult } from "../../utils/testing";


test('startSearching: updates search state', () => {
    // when
    store.dispatch(startSearching({ searchText: 'Wael', searchType: 'user' }));
    // then
    expect((<any>store.getState().search).state).toEqual('loading');
});

test('resetSearch: set search state to \'initial\'', () => {
    // given
    store.dispatch(startSearching({ searchText: 'Wael', searchType: 'user' }));
    // when
    const searchText = 'W';
    store.dispatch(resetSearch({ searchText: searchText, searchType: 'user' }));
    // then
    expect((<any>store.getState().search).state).toEqual('initial');
    expect((<any>store.getState().search).searchText).toEqual(searchText);
});

test('searchResultLoaded: set search state to \'loaded\'', () => {
    // given
    store.dispatch(startSearching({ searchText: 'Wael', searchType: 'user' }));
    // when
    const result = mockUserSearchResult();
    store.dispatch(searchResultLoaded(result));
    // then
    expect((<any>store.getState().search).state).toEqual('loaded');
});

test('searchResultFailed: set search state to \'failed\'', () => {
    // given
    store.dispatch(startSearching({ searchText: 'Wael', searchType: 'user' }));
    // when
    const error = "Rate limit reached";
    store.dispatch(searchResultFailed(error));
    // then
    expect((<any>store.getState().search).state).toEqual('failed');
    expect((<any>store.getState().search).error).toEqual(error);
});


describe('search: ', () => {
    beforeEach(() => {
        const fetchMock = fetch as FetchMock;
        fetchMock.resetMocks()
    });

    it('search: update store, search namespace, after fetching result', async () => {
        // given
        const fetchMock = fetch as FetchMock;
        fetchMock.mockResponseOnce(JSON.stringify(mockUserSearchResult()));
        // when
        // @ts-ignore
        await store.dispatch(search({searchText: "typescript", searchType: "repository"}));
        // then
        expect((<any>store.getState().search).state).toEqual('loaded');
    });

    it('search: update store, for repository namespace, after fetching result', async () => {
        // given
        const fetchMock = fetch as FetchMock;
        const result = mockUserSearchResult();
        fetchMock.mockResponseOnce(JSON.stringify(result));
        // when
        // @ts-ignore
        await store.dispatch(search({searchText: "typescript", searchType: "repository"}));
        // then
        expect((<any>store.getState().repository)["typescript"]).toEqual(result);
    })

    it('search: update store populates error message when search failed', async () => {
        // given
        const fetchMock = fetch as FetchMock;
        const responseInit = { status: 500 };
        fetchMock.mockResponseOnce(JSON.stringify({detail: "Fatal error"}), responseInit);
        // @ts-ignore
        await store.dispatch(search({searchText: "typescript", searchType: "repository"}));
        // then
        expect((<any>store.getState().search).state).toEqual('failed');
    })
});