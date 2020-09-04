import * as React from 'react';

import { IndexPage } from '../pages/index';
import { render } from '../utils/testing/render';


describe('IndexPage', () => {
    it.each`
        state
        ${'initial'}
        ${'loading'}
        ${'loaded'}
    `('should render on $state state', ({ state }) => {
        // given
        jest.mock('../components/Search', () => () => 'Search');
        const initialState = { search: { state: state } };
        // when
        const tree = render(<IndexPage />, { initialState: initialState }).toJSON();
        // then
        expect(tree).toMatchSnapshot(`indexpage-${state}`);
    })
})