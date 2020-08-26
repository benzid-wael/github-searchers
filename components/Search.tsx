import * as React from 'react';

import styled from 'styled-components';


const MainContainer = styled.div`
`;

const WrapperContainer = styled.div`
  width: 100%;
  margin: 0 16px;
  display: flex;
  align-items: first baseline;
`;

const InputText = styled.input`
  height: 48px;
  width: 33%;
  min-width: 200px;
  padding: 4px;
  box-sizing: border-box;
`;

const Select = styled.select`
  position: relative;
  margin: 8px;
  padding: 8px;
  height: 48px;
  width: 116px;
  border: .5px solid #cecece;
  color: gray;
  font-size: 12px;  
  font-weight: 400;
  /* remove default arrow */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: transparent url('/images/arrow_down.webp');
  background-repeat: no-repeat;
  background-position: right;
  background-origin: content-box;
`;


const Search = () => {

  return <MainContainer>
    <WrapperContainer>
      <InputText name="text" placeholder="Start typing to search ..." />
      <Select name="searchType">
        <option value="user">Users</option>
        <option value="repository">Repositories</option>
      </Select>
    </WrapperContainer>
  </MainContainer>
};


export default Search;

