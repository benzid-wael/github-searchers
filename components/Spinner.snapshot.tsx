import * as React from 'react';
import renderer from 'react-test-renderer';

import Spinner from './Spinner'


describe('Spinner', () => {
  it('Spinner without text should render correctly', () => {
    const tree = renderer.create(<Spinner />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Spinner with text should render correctly', () => {
    const tree = renderer.create(<Spinner text='loading...' />).toJSON();
    expect(tree).toMatchSnapshot();
  });
})