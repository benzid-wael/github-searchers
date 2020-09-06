import * as React from 'react';
import renderer from 'react-test-renderer';

import ExternalLink from './ExternalLink';

describe('ExternalLink should render correctly', () => {
    it('ExternalLink without custom styles', () => {
        const tree = renderer
            .create(<ExternalLink url="https://github-searchers.vercel.app" label="Github Searchers" />)
            .toJSON();
        expect(tree).toMatchSnapshot('without-custom-style');
    });

    it('ExternalLink without custom styles', () => {
        const tree = renderer
            .create(
                <ExternalLink
                    url="https://github-searchers.vercel.app"
                    label="Github Searchers"
                    style={{ color: 'red' }}
                />,
            )
            .toJSON();
        expect(tree).toMatchSnapshot('with-custom-style');
    });
});
