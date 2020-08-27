import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SearchResult } from '../../utils/github';
import User from './user';


interface UserSearchResult {
    [key: string]: SearchResult<User> | null;
}


type SearchStatus = "initial" | "loading" | "loaded" | "error"
export interface UserState {
    status: SearchStatus;
    searchText: string;
    results: UserSearchResult
}


let initialState: UserState = {
    status: "initial",
    searchText: "",
    results: {}
};


const userSlice = createSlice({
    name: "UserSlice",
    initialState,
    reducers: {
        startSearching(state, action: PayloadAction<{searchText: string}>) {
            return {
                ...state,
                status: <SearchStatus>"loading",
                searchText: action.payload.searchText
            }
        },
        searchFinished(state, action: PayloadAction<{searchText: string, result: SearchResult<User>}>) {
            let newState = {
                ...state,
                status: <SearchStatus>"loaded"
            };
            newState[action.payload.searchText] = action.payload.result;
            return newState;
        }
    }
});


export const {
    startSearching,
    searchFinished,
} = userSlice.actions;

export default userSlice.reducer;