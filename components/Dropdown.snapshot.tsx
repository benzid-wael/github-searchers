import * as React from 'react';
import renderer from 'react-test-renderer';

import Dropdown from './Dropdown';

describe('Dropdown', () => {
    it('Dropdownshould render correctly when selected is missing', () => {
        const options = [
            { label: 'Ali', value: 'Ali' },
            { label: 'Ahmed', value: 'Ahmed' },
        ];
        const tree = renderer.create(<Dropdown options={options} />).toJSON();
        expect(tree).toMatchSnapshot('without-selected-option');
    });

    it('Dropdownshould render correctly when selected is provided', () => {
        const options = [
            { label: 'Ali', value: 'Ali' },
            { label: 'Ahmed', value: 'Ahmed' },
        ];
        const tree = renderer.create(<Dropdown options={options} selected="Ali" />).toJSON();
        expect(tree).toMatchSnapshot('with-selected-option');
    });
});
