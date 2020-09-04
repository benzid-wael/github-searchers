import React, { useState, useEffect }  from 'react';
import { connect, ConnectedProps } from "react-redux";
import styled, {CSSProperties} from 'styled-components';

import Card from "../components/Card";
import FlexGrid from '../components/FlexGrid';
import Layout from '../components/Layout';
import Repository from '../components/Repository';
import Search from '../components/Search';
import Spinner from '../components/Spinner';
import User from '../components/User';

import './index.css'


const AppHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60px;
  margin: 4px;
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 100%;
`;

const AppName = styled.h1`
  font-weight: 600;
  font-size: 20px;
  margin: 0px;
`;

const Hint = styled.h3`
  color: gray;
  margin: 0px;
  font-size: 16px;
  font-weight: 200;
`;


const mapStateToProps = (state) => ({
  search: state.search,
});

const connector = connect(mapStateToProps, null);
type PropsFromRedux = ConnectedProps<typeof connector>;


const SearchResult = (searchType, result) => {
  const CardContent =  searchType == 'user' ? User : Repository;

  return <FlexGrid>
    {result.items.map( (item, i) => <Card key={i}><CardContent data={item}/></Card>)}
  </FlexGrid>
};


export const IndexPage: React.FC<PropsFromRedux> = (props) => {
  const [searchState, setSearchState] = useState("initial");

  useEffect(() => {
    if(props.search) {
      setSearchState(props.search?.state);
    }
  });

  const initialStateStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    verticalAlign: 'middle'
  };

  return <Layout title="Github Searcher">
    <div style={searchState !== "loaded" ? initialStateStyle : { marginTop: "24px" }}>
      <div>
        <AppHeader>
          <img src="/images/github.svg" style={{padding: "0 4px", width: "48px", height: "48px", marginTop: "-4px" }}/>
          <Brand>
            <AppName>Gihub Searchers</AppName>
            <Hint>Search users or repositories below</Hint>
          </Brand>
        </AppHeader>

        <Search />

        {(searchState === "loaded" && props.search.searchResult) ? SearchResult(props.search.searchType, props.search.searchResult): "" }
        {searchState === "loading" ? <Spinner text='Loading...' /> : ''}
      </div>
    </div>

  </Layout>
};

export default connector(IndexPage);
