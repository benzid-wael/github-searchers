import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


const InitialState = {
    search: {
        searchText: '',
        searchType: 'repository',
        state: 'initial',
        error: null,
    },
    user: {},
    repository: {}
};


export const mockStore = (state?: any) => {
    const initialState = Object.assign({}, InitialState, state || {});
    const mockStoreFactory = configureStore([thunk]);
    return mockStoreFactory(initialState);
}

// @ts-ignore
const render = (component, { initialState } = {}) => {
    const store = mockStore(initialState);

    return renderer.create(
        <Provider store={store}>
            {component}
        </Provider>
    )
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }