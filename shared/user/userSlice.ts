import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SearchResult } from '../../utils/github';
import { SearchStatus } from '../search/search';
import User from './user';


interface UserSearchResult {
  status: SearchStatus;
  result: SearchResult<User> | null;
  error: string|null;
}


export interface UserSearchState {
  [key: string]: UserSearchResult;
}


let initialState: UserSearchState = {};


const userSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    startSearching(state, action: PayloadAction<{searchText: string}>) {
      const newState = {
        ...state
      };
      newState[action.payload.searchText] = {
        status: "loading",
        result: null,
        error: null,
      };
      return newState;
    },
    searchSucceed(state, action: PayloadAction<{searchText: string, result: SearchResult<User>}>) {
      const newState = {
        ...state
      };
      newState[action.payload.searchText] = {
        status: "loaded",
        result: action.payload.result,
        error: null,
      };
      return newState;
    },
    searchFailed(state, action: PayloadAction<{searchText: string, error: string}>) {
      const newState = {
        ...state
      };
      newState[action.payload.searchText] = {
        status: "error",
        result: null,
        error: action.payload.error,
      };
      return newState;
    }
  }
});


export const {
  startSearching,
  searchSucceed,
  searchFailed,
} = userSlice.actions;

export default userSlice.reducer;