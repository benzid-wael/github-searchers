import React from 'react';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from '../../store/rootReducer';


// @ts-ignore
const render = (component, { initialState, store = createStore(reducer, initialState) } = {}) => {
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