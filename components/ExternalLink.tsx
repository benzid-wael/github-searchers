import React, { CSSProperties } from 'react';
import styled from 'styled-components';

const A = styled.a`
    color: #008c99;
    text-decoration: none;
    padding: 0.2em 0.8em;

    &:hover {
        color: #0ab0bf;
    }
    &:active {
        color: #70ccd3;
    }
    &:visited {
        color: #666666;
    }
`;

export interface ExternalLinkProps {
    url: string;
    label: string;
    style?: CSSProperties;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ url, label, style }: ExternalLinkProps) => {
    return (
        <A href={url} target="_blank" style={style}>
            {label}
        </A>
    );
};

export default ExternalLink;
