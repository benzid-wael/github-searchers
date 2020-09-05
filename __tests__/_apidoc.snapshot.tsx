import * as React from 'react';
import renderer from 'react-test-renderer';

import ApiDoc from '../pages/_apidoc'


it('ApiDoc should render correctly', () => {
    const tree = renderer.create(<ApiDoc />).toJSON();
    expect(tree).toMatchSnapshot();
});