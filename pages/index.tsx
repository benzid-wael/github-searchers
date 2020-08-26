import React  from 'react'
import styled from 'styled-components';

import Layout from '../components/Layout'
import Search from '../components/Search'
import FlexGrid from '../components/FlexGrid'
import Card from "../components/Card";


const MainContainer = styled.div`
`;

const WrapperContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const Header = styled.header`
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

const Title = styled.span`
  font-weight: 600;
  font-size: 20px;
`;

const Hint = styled.span`
  color: gray;
`;


const IndexPage = () => {
  const items = true;
  const marginTop = items ? "20px" : "50%";
  return <Layout title="Github Searcher">
    <MainContainer>
      <WrapperContainer style={{marginTop: marginTop}}>
        <Header>
          <img src="/images/github.svg" style={{padding: "0 8px", width: "40px", height: "40px", marginTop: "-8px" }}/>
          <Brand>
            <Title>Gihub Searchers</Title>
            <Hint>Search users or repositories below</Hint>
          </Brand>
        </Header>

        <Search/>

        <FlexGrid>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </FlexGrid>
      </WrapperContainer>
    </MainContainer>

  </Layout>
};

export default IndexPage
