import React, { useState, useEffect }  from 'react';
import { connect, ConnectedProps } from "react-redux";
import styled, {CSSProperties} from 'styled-components';

import Card from "../components/Card";
import FlexGrid from '../components/FlexGrid';
import User from '../components/User';
import Repository from '../components/Repository';
import Layout from '../components/Layout';
import Search from '../components/Search';

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

const Loader = styled.span`
  position: relative;
  display: inline-block;
  text-align: center;
  width: 120px;
  height: 24px;
  left: calc(30% - 120px);
  margin: 16px;
  overflow: hidden;
  line-height: 1.5em;
  font-size: 18px;
  font-weight: 400;
  
  &::after {
    display: inline-table;
    white-space: pre;
    content: "🕐\\A🕑\\A🕒\\A🕓\\A🕔\\A🕕\\A🕖\\A🕗\\A🕘\\A🕙\\A🕚\\A🕛";
    animation: spin12 3s steps(12) infinite;
    width: 1.5em;
  }
  
  @keyframes spin12 {
    to {
      transform: translateY(-18.0em);
    }
  }
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


const IndexPage: React.FC<PropsFromRedux> = (props) => {
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
          <img src="/images/github.svg" style={{padding: "0 8px", width: "40px", height: "40px", marginTop: "-8px" }}/>
          <Brand>
            <AppName>Gihub Searchers</AppName>
            <Hint>Search users or repositories below</Hint>
          </Brand>
        </AppHeader>

        <Search />

        {(searchState === "loaded" && props.search.searchResult) ? SearchResult(props.search.searchType, props.search.searchResult): "" }
        {searchState === "loading" ? <Loader>Loading...</Loader> : ""}
      </div>
    </div>

  </Layout>
};

export default connector(IndexPage);
