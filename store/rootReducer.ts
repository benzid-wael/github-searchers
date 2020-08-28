import { combineReducers } from '@reduxjs/toolkit'

import SearchReducer from '../shared/search/searchSlice';
import UserReducer from '../shared/user/userSlice';


const rootReducer = combineReducers({
    search: SearchReducer,
    user: UserReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
