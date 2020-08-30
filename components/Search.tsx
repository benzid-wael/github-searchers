import React, { useState } from 'react';
import { connect, ConnectedProps } from "react-redux";
import { resetSearch, search } from '../shared/search/searchSlice';
import { MINIMUM_SEARCH_TERM_LENGTH } from '../utils/config';
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


const mapStateToProps = (state) => ({
    search: state.search,
});
const mapDispatchToProps = dispatch => {
  return {
    resetSearch: (payload) => dispatch(resetSearch(payload)),
    search: (payload) => dispatch(search(payload)),
  }
};

const connector = connect(mapStateToProps, mapDispatchToProps);
// The inferred type will look like:
type PropsFromRedux = ConnectedProps<typeof connector>


export const Search: React.FC<PropsFromRedux> = (props) => {
  const [searchQuery, setSearchQuery] = useState<{searchText: string, searchType: string}>({searchText: "", searchType: "user"});

  const startSearchingIfPossible = (searchQuery) => {
    const searchText = searchQuery.searchText;
    const query = {
      searchText: searchQuery.searchText,
      searchType: searchQuery.searchType,
    };
    if (searchText.length >= MINIMUM_SEARCH_TERM_LENGTH) {
      props.search(query);
    } else {
      props.resetSearch(query);
    }
  };

  const searchTextChanged = (e) => {
    const value = e.target.value;
    const newSearchQuery = {...searchQuery, searchText: value};
    setSearchQuery(newSearchQuery);
    startSearchingIfPossible(newSearchQuery);
  };

  const searchTypeChanged = (e) => {
    const value = e.target.value;
    const newSearchQuery = {...searchQuery, searchType: value};
    setSearchQuery(newSearchQuery);
    startSearchingIfPossible(newSearchQuery);
  };

  return <MainContainer>
    <WrapperContainer>
      <InputText
        name="text"
        autoComplete="off"
        placeholder="Start typing to search ..."
        onChange={searchTextChanged}
      />
      <Select
        name="searchType"
        onChange={searchTypeChanged}
      >
        <option value="user">Users</option>
        <option value="repository">Repositories</option>
      </Select>
    </WrapperContainer>
  </MainContainer>
};


export default connector(Search);
