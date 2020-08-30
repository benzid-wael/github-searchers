import * as React from 'react';
import renderer from 'react-test-renderer';

import Card from './Card'
import FlexGrid from './FlexGrid'


describe('FlexGrid should render correctly', () => {
  it('Empty FlexGrid', () => {
    const tree = renderer.create(<FlexGrid />).toJSON();
    expect(tree).toMatchSnapshot('empty-flexgtid');
  });

  it('FlexGrid with some cards', () => {
    const cards = <FlexGrid>
      <Card title="First Card" />
      <Card title="Second Card" />
      <Card title="Third Card">
        <h3>Hello World!</h3>
      </Card>
    </FlexGrid>;
    const tree = renderer.create(cards).toJSON();
    expect(tree).toMatchSnapshot('non-empty-flexgrid');
  });
});