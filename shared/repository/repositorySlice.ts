import Repository from './repository';
import { makeSlice } from '../search/searchResultSlice'


const repositorySlice = makeSlice<Repository>("RepositorySlice");


export const {
  addSearchResult,
} = repositorySlice.actions;

export const RepositoryReducer = repositorySlice.reducer;