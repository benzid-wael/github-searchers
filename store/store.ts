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

if (process.env.NODE_ENV === 'development') {
  (module as any).hot?.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer);
  })
}

export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default store;
