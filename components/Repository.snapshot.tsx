import * as React from 'react';
import renderer from 'react-test-renderer';

import Repository from './Repository';
import { mockRepository } from '../utils/testing';

it('Repository should render correctly', () => {
    const tree = renderer.create(<Repository data={mockRepository()} />).toJSON();
    expect(tree).toMatchSnapshot();
});
