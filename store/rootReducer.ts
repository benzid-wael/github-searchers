import { combineReducers } from '@reduxjs/toolkit';

import { RepositoryReducer } from '../shared/repository/repositorySlice';
import SearchReducer from '../shared/search/searchSlice';
import { UserReducer } from '../shared/user/userSlice';

export const rootReducer = combineReducers({
    repository: RepositoryReducer,
    search: SearchReducer,
    user: UserReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
