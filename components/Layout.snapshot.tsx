import * as React from 'react';
import renderer from 'react-test-renderer';

import Layout from './Layout'


describe('Layout should render correctly', () => {
  it('Layout without children', () => {
    const tree = renderer.create(<Layout />).toJSON();
    expect(tree).toMatchSnapshot('layout-without-children');
  });

  it('Layout with custom title', () => {
    const tree = renderer.create(<Layout title="Github Searchers" />).toJSON();
    expect(tree).toMatchSnapshot('layout-with-custom-title');
  });

  it('Layout with some children', () => {
    const page = <Layout title="Github Searchers">
      <header>Github Searchers</header>
      <section className="main">
        <span>This is main area</span>
      </section>
      <section className="footer">
        <span>This is footer</span>
      </section>
    </Layout>;
    const tree = renderer.create(page).toJSON();
    expect(tree).toMatchSnapshot('layout-with-children');
  });
});