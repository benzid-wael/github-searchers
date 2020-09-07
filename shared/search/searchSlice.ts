import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import Search from './search';
import Repository from '../../shared/repository/repository';
import { addSearchResult as addRepositorySearchResult } from '../../shared/repository/repositorySlice';
import User from '../../shared/user/user';
import { addSearchResult as addUserSearchResult } from '../../shared/user/userSlice';
import { AppThunk, persistor } from '../../store/store';
import { SearchResult } from '../../utils/backend/github';
import { GithubSearcherAPI } from '../../utils/frontend/GithubSearcherAPI';

export type SearchType = 'user' | 'repository';

export interface SearchQueryPayload {
    searchType: SearchType;
    searchText: string;
}

const initialState: Search = {
    searchText: '',
    searchType: 'user',
    state: 'initial',
    searchResult: null,
    error: null,
};

const searchSlice = createSlice({
    name: 'SearchSlice',
    initialState,
    reducers: {
        resetSearch(state, action: PayloadAction<SearchQueryPayload>) {
            const payload = action.payload;
            return {
                ...state,
                searchText: payload.searchText,
                searchType: payload.searchType,
                state: 'initial',
                searchResult: null,
                error: null,
            };
        },
        startSearching(state, action: PayloadAction<SearchQueryPayload>) {
            const payload = action.payload;
            return {
                ...state,
                searchText: payload.searchText,
                searchType: payload.searchType,
                state: 'loading',
                searchResult: null,
                error: null,
            };
        },
        searchResultLoaded(state, action: PayloadAction<SearchResult<User> | SearchResult<Repository>>) {
            return {
                ...state,
                state: 'loaded',
                searchResult: action.payload,
            };
        },
        searchResultFailed(state, action: PayloadAction<string>) {
            return {
                ...state,
                state: 'failed',
                error: action.payload,
            };
        },
    },
});

export const { resetSearch, startSearching, searchResultLoaded, searchResultFailed } = searchSlice.actions;

export const SearchReducer = searchSlice.reducer;

export const search = (query: SearchQueryPayload): AppThunk => async (dispatch, getState) => {
    const loadFromAPI = async (query: SearchQueryPayload) => {
        const client = new GithubSearcherAPI();
        const response = await client.search(query);
        if (query.searchType === 'user') {
            // Update search result
            dispatch(
                addUserSearchResult({
                    searchText: query.searchText,
                    result: response,
                }),
            );
        } else {
            // Update search result
            dispatch(
                addRepositorySearchResult({
                    searchText: query.searchText,
                    result: response,
                }),
            );
        }

        return response;
    };

    const loadFromStore = (query: SearchQueryPayload) => {
        const searchHistory = query.searchType === 'user' ? getState().user : getState().repository;
        return searchHistory[query.searchText];
    };

    dispatch(startSearching(query));
    try {
        let response = loadFromStore(query);
        if (!response) {
            response = await loadFromAPI(query);

            // persist store
            persistor.persist();
        }

        // Update search result only if it match the latest request
        const currentSearchState = <Search>getState().search;
        if (currentSearchState.searchText == query.searchText && currentSearchState.searchType == query.searchType) {
            dispatch(searchResultLoaded(response));
        } else {
            console.warn('Outdated search result has been ignored');
        }
    } catch (e) {
        dispatch(searchResultFailed(e.message));
    }
};

export default SearchReducer;
