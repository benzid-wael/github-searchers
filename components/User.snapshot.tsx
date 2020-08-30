import * as React from 'react';
import renderer from 'react-test-renderer';

import User from './User';
import { mockUser } from "../utils/testing";


it('User should render correctly', () => {
  const tree = renderer.create(<User data={mockUser({})}/>).toJSON();
  expect(tree).toMatchSnapshot();
});