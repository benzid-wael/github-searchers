import * as React from 'react';
import renderer from 'react-test-renderer';

import Card from './Card'


it('Card should render correctly', () => {
  const tree = renderer.create(<Card />).toJSON();
  expect(tree).toMatchSnapshot();
});