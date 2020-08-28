import { combineReducers } from '@reduxjs/toolkit'

import SearchReducer from '../shared/search/searchSlice';
import RepositoryReducer from '../shared/repository/repositorySlice';
import UserReducer from '../shared/user/userSlice';


const rootReducer = combineReducers({
    search: SearchReducer,
    user: UserReducer,
    repository: RepositoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
