import { FetchMock } from 'jest-fetch-mock';

import {
    resetSearch,
    search,
    searchResultFailed,
    searchResultLoaded,
    startSearching,
    SearchQueryPayload,
} from './searchSlice';
import { mockRepositorySearchResult, mockUserSearchResult } from '../../utils/testing/mocks';
import { mockStore } from '../../utils/testing/render';

let store;

beforeEach(() => {
    store = mockStore();
});

test('startSearching: updates search state', () => {
    // given
    const payload: SearchQueryPayload = { searchText: 'Wael', searchType: 'user' };
    const expectedPayload = {
        type: 'SearchSlice/startSearching',
        payload: payload,
    };
    // when
    store.dispatch(startSearching(payload));
    // then
    const actions = store.getActions();
    expect(actions).toEqual([expectedPayload]);
});

test("resetSearch: set search state to 'initial'", () => {
    // given
    const payload: SearchQueryPayload = { searchText: 'Wa', searchType: 'user' };
    const expectedPayload = {
        type: 'SearchSlice/resetSearch',
        payload: payload,
    };
    // when
    store.dispatch(resetSearch(payload));
    // then
    const actions = store.getActions();
    expect(actions).toEqual([expectedPayload]);
});

test("searchResultLoaded: set search state to 'loaded'", () => {
    // given
    const result = mockUserSearchResult();
    const expectedPayload = {
        type: 'SearchSlice/searchResultLoaded',
        payload: result,
    };
    // when
    store.dispatch(searchResultLoaded(result));
    // then
    const actions = store.getActions();
    expect(actions).toEqual([expectedPayload]);
});

test("searchResultFailed: set search state to 'failed'", () => {
    // given
    const error = 'Rate limit reached';
    const expectedPayload = {
        type: 'SearchSlice/searchResultFailed',
        payload: error,
    };
    // when
    store.dispatch(searchResultFailed(error));
    // then
    const actions = store.getActions();
    expect(actions).toEqual([expectedPayload]);
});

describe('search: ', () => {
    beforeEach(() => {
        const fetchMock = fetch as FetchMock;
        fetchMock.resetMocks();
    });

    it('search: update store, search state, after fetching result', async () => {
        // given
        const fetchMock = fetch as FetchMock;
        const result = mockUserSearchResult();
        const expectedPayload = {
            type: 'RepositorySlice/addSearchResult',
            payload: {
                searchText: 'typescript',
                result: result,
            },
        };
        fetchMock.mockResponseOnce(JSON.stringify(result));
        // when
        await store.dispatch(search({ searchText: 'typescript', searchType: 'repository' }));
        // then
        const actions = store.getActions();
        expect(actions[1]).toEqual(expectedPayload);
    });

    it('search: update repository state after fetching result', async () => {
        // given
        const fetchMock = fetch as FetchMock;
        const result = mockRepositorySearchResult();
        const expectedPayload = {
            type: 'RepositorySlice/addSearchResult',
            payload: {
                searchText: 'typescript',
                result: result,
            },
        };
        fetchMock.mockResponseOnce(JSON.stringify(result));
        // when
        await store.dispatch(search({ searchText: 'typescript', searchType: 'repository' }));
        // then
        const actions = store.getActions();
        expect(actions[1]).toEqual(expectedPayload);
    });

    it('search: update store populates error message when search failed', async () => {
        // given
        const error = 'Fatal Error';
        const expectedPayload = {
            type: 'SearchSlice/searchResultFailed',
            payload: error,
        };

        const fetchMock = fetch as FetchMock;
        const responseInit = { status: 500 };
        fetchMock.mockResponseOnce(JSON.stringify({ detail: error }), responseInit);
        await store.dispatch(search({ searchText: 'typescript', searchType: 'repository' }));
        // then
        const actions = store.getActions();
        expect(actions[1]).toEqual(expectedPayload);
    });
});
