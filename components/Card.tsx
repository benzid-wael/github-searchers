import React, { ReactNode } from 'react'
import styled from 'styled-components';


const CardWrapper = styled.div`
  margin 16px 8px;
  width: 300px;
  height: 200px;
  border: 1px solid gray;
`;

const CardHeader = styled.div`
  background-color: #f5f5f5;
  height: auto;
  padding: 8px;
  border-bottom: 1px solid gray;
`;


interface SearchResultProps {
    children?: ReactNode;
    style?: any;
    title?: ReactNode|string;
}


const Card = (props: SearchResultProps) => {
  const title = props.title || "My card";

  return <CardWrapper style={props.style}>
    <CardHeader>{title}</CardHeader>
    {props.children}
  </CardWrapper>
};

export default Card;