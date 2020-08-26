import React, { ReactNode } from 'react'
import styled from 'styled-components';


const MainContainer = styled.div`
`;

const WrapperContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 8px;
  display: flex;
  flex-wrap: wrap;
`;


interface SearchResultProps {
    children?: ReactNode;
}


const FlexGrid = (props: SearchResultProps) => {

  return <MainContainer>
    <WrapperContainer>
      {props.children}
    </WrapperContainer>
  </MainContainer>
};

export default FlexGrid;