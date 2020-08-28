import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SearchResult } from '../../utils/github';


export interface SearchResultState<T> {
  [key: string]: SearchResult<T>;
}


export const makeSlice = <T>(name: string) => {
    const initialState: SearchResultState<T> = {};
    return createSlice({
        name: name,
        initialState,
        reducers: {
            // @ts-ignore
            addSearchResult(state, action: PayloadAction<{searchText: string, result: SearchResult<T>}>) {
                return {
                    ...state,
                    [action.payload.searchText]: action.payload.result
                }
            }
        }
    });
};

