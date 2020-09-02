import User from './user';
import { makeSlice } from '../search/searchResultSlice'


const userSlice = makeSlice<User>("UserSlice");


export const {
  addSearchResult,
} = userSlice.actions;


export const UserReducer = userSlice.reducer;