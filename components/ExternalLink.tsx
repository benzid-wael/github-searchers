import React, {CSSProperties} from 'react'
import styled from 'styled-components';


const A = styled.a`
  color: #008c99;
  text-decoration: none;
  padding: .2em .8em;

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


const ExternalLink: React.FC<{url: string, label: string, style?: CSSProperties}> = ({url, label, style}) => {
  return <A href={url} target="_blank" style={style}>{label}</A>
};


export default ExternalLink;