import { combineReducers } from '@reduxjs/toolkit'

import UserReducer from '../shared/user/userSlice';


const rootReducer = combineReducers({
    user: UserReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
