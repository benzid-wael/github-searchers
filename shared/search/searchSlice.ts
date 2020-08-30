import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import Search from './search';
import Repository from '../../shared/repository/repository';
import { addSearchResult as addRepositorySearchResult } from '../../shared/repository/repositorySlice';
import User from '../../shared/user/user';
import { addSearchResult as addUserSearchResult } from '../../shared/user/userSlice';
import { AppThunk } from "../../store/store";
import { SearchResult } from '../../utils/backend/github';
import { GithubSearcherAPI } from "../../utils/frontend/GithubSearcherAPI";


export type SearchType = "user" | "repository";

export interface SearchQueryPayload {
  searchType: SearchType;
  searchText: string;
}


let initialState: Search = {
  searchText: "",
  searchType: "user",
  state: "initial",
  searchResult: null,
  error: null,
};


const searchSlice = createSlice({
  name: "SearchSlice",
  initialState,
  reducers: {
    resetSearch(state, action: PayloadAction<SearchQueryPayload>) {
      const payload = action.payload;
      return {
        ...state,
        searchText: payload.searchText,
        searchType: payload.searchType,
        state: "initial",
        searchResult: null,
        error: null,
      }
    },
    startSearching(state, action: PayloadAction<SearchQueryPayload>) {
      const payload = action.payload;
      return {
        ...state,
        searchText: payload.searchText,
        searchType: payload.searchType,
        state: "loading",
        searchResult: null,
        error: null,
      }
    },
    searchResultLoaded(state, action: PayloadAction<SearchResult<User> | SearchResult<Repository>>) {
      return {
        ...state,
        state: "loaded",
        searchResult: action.payload
      }
    },
    searchResultFailed(state, action: PayloadAction<string>) {
      return {
        ...state,
        state: "failed",
        error: action.payload
      }
    }
  }
});


export const {
  resetSearch,
  startSearching,
  searchResultLoaded,
  searchResultFailed,
} = searchSlice.actions;


export const search = (query: SearchQueryPayload): AppThunk => async (dispatch, getState)  => {
  dispatch(startSearching(query));
  try {
    const client = new GithubSearcherAPI();
    const response = await client.search(query);
    if(query.searchType === "user") {
      // Update search result
      dispatch(addUserSearchResult({
        searchText: query.searchText,
        result: response
      }));
      // Todo persist search result
    } else {
      // Update search result
      dispatch(addRepositorySearchResult({
        searchText: query.searchText,
        result: response
      }));
      // Todo persist search result
    }

    // Update search result only if it match the latest request
    const currentSearchState = getState().search;
    if(currentSearchState.searchText == query.searchText && currentSearchState.searchType == query.searchType) {
      dispatch(searchResultLoaded(response));
    } else {
      console.warn("Outdated search result has been ignored");
    }

  } catch (e) {
    dispatch(searchResultFailed(e.message));
  }
};


export default searchSlice.reducer;