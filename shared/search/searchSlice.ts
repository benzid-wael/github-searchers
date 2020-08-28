import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SearchResult } from '../../utils/github';
import User from '../../shared/user/user';
import Repository from '../../shared/repository/repository';
import Search from './search';


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
    resetSearch(state, action: PayloadAction<{searchText: string, searchType: string}>) {
      const payload = action.payload;
      return {
        ...state,
        searchText: payload.searchText,
        searchType: payload.searchType,
        state: "initial",
        searchResult: null,
      }
    },
    startSearching(state, action: PayloadAction<{searchText: string, searchType: string}>) {
      const payload = action.payload;
      return {
        ...state,
        searchText: payload.searchText,
        searchType: payload.searchType,
        state: "loading",
        searchResult: null,
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
        reason: action.payload
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

export default searchSlice.reducer;