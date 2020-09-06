import React, { ReactNode } from 'react';
import Head from 'next/head';

import styled from 'styled-components';

type Props = {
    children?: ReactNode;
    title?: string;
};

const Container = styled.div`
    margin: 0 auto;
`;

const Layout = ({ children, title = 'This is the default title' }: Props) => (
    <div>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Container>{children}</Container>
    </div>
);

export default Layout;
