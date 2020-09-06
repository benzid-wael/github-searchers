import * as React from 'react';
import renderer from 'react-test-renderer';

import { Search } from './Search';

it('Search should render correctly', () => {
    const tree = renderer.create(<Search />).toJSON();
    expect(tree).toMatchSnapshot();
});
