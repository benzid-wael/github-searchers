import React, { ReactNode } from 'react'
import styled from 'styled-components';


const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin 16px 8px;
  width: 300px;
  height: 232px;
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

  return <CardWrapper style={props.style}>
    {props.title ? <CardHeader>{props.title}</CardHeader> : ""}
    {props.children}
  </CardWrapper>
};

export default Card;