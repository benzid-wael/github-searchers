import React, { useState } from 'react';
import { connect, ConnectedProps } from "react-redux";

import Dropdown from './Dropdown';
import Input from './Input';
import { resetSearch, search } from '../shared/search/searchSlice';
import { MINIMUM_SEARCH_TERM_LENGTH } from '../shared/config';
import UseDebouncedCallback from '../utils/frontend/debounce';

import styled from 'styled-components';


const MainContainer = styled.div`
`;

const WrapperContainer = styled.div`
  width: 100%;
  margin: 0 16px;
  display: flex;
  align-items: first baseline;
`;


const mapStateToProps = (state) => ({
    search: state.search,
});
const mapDispatchToProps = dispatch => {
  return {
    resetSearch: (payload) => dispatch(resetSearch(payload)),
    performSearch: (payload) => dispatch(search(payload)),
  }
};

const connector = connect(mapStateToProps, mapDispatchToProps);
// The inferred type will look like:
type PropsFromRedux = ConnectedProps<typeof connector>


export const Search: React.FC<PropsFromRedux> = (props) => {
  const [searchQuery, setSearchQuery] = useState<{searchText: string, searchType: string}>({searchText: "", searchType: "user"});

  const performSearch = UseDebouncedCallback((payload) => {
    // Based on Doherty Research paper, a debounce of 400ms is a good start.
    // We can adjust the waiting time late, once we have a better understanding of our users
    props.performSearch(payload);
  }, 400);

  const startSearchingIfPossible = (searchQuery) => {
    const searchText = searchQuery.searchText;
    const query = {
      searchText: searchQuery.searchText,
      searchType: searchQuery.searchType,
    };
    if (searchText.length >= MINIMUM_SEARCH_TERM_LENGTH) {
      performSearch(searchQuery);
    } else {
      props.resetSearch(query);
    }
  };

  const searchTextChanged = (value) => {
    const newSearchQuery = {...searchQuery, searchText: value.toLowerCase()};
    setSearchQuery(newSearchQuery);
    startSearchingIfPossible(newSearchQuery);
  };

  const searchTypeChanged = (option) => {
    const value = option.value;
    const newSearchQuery = {...searchQuery, searchType: value};
    setSearchQuery(newSearchQuery);
    startSearchingIfPossible(newSearchQuery);
  };

  const searchTypes = [
    { value: 'user', label: 'Users' },
    { value: 'repository', label: 'Repositories' },
  ];

  return <MainContainer>
    <WrapperContainer>
      <Input
        name="text"
        autoComplete={false}
        placeholder="Start typing to search ..."
        onChange={searchTextChanged}
      />

      <Dropdown
        name='searchType'
        selected='user'
        options={searchTypes}
        onChange={searchTypeChanged}
      />
    </WrapperContainer>
    <div style={{ color: 'red', margin: '4px', textAlign: 'center' }}>{props.search?.error}</div>
  </MainContainer>
};


export default connector(Search);
