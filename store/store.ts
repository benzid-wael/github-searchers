import { configureStore, Action } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'

import rootReducer, { RootState } from './rootReducer';


declare interface NodeModule {
  hot: {
    accept(path?: () => void, callback?: () => void): void
  }
}

const store = configureStore({
  reducer: rootReducer
});


export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default store;
