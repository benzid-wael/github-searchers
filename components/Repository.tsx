import React  from 'react'
import styled from 'styled-components';

import RepositoryModel from '../shared/repository/repository';
import User from './User';
import ExternalLink from './ExternalLink';


const RepositoryContainer = styled.div`
    margin: 8px 4px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
`;

const LabelContainer = styled.span`
    margin: 4px 0;
    font-size: 12px;
    background-color: #008c99;
    padding: 4px;
    color: white;
    display: inline;
`;


export const Stats: React.FC<{title: string, value: number}> = ({title, value}) => {
    return <div style={{ margin: "8px" }}>
        <LabelContainer style={{ fontWeight: 500 }}>{title}</LabelContainer>
        <LabelContainer style={{ backgroundColor: "#70ccd3" }}>{value}</LabelContainer>
    </div>;
};


export const Repository: React.FC<{data: RepositoryModel}> = (props) => {
  const repo = props.data;

  return <RepositoryContainer>
      <span style={{ margin: "4px", fontSize: "18px", fontWeight: "bold" }}>
          <ExternalLink url={repo.repositoryUrl} label={repo.name} />
      </span>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
          <Stats title="Stars" value={repo.stars} />
          <Stats title="Forks" value={repo.forksCount} />
          <Stats title="Watchers" value={repo.watchers} />
          <Stats title="Open Issues" value={repo.openIssuesCount} />
      </div>
      <User data={repo.author} imgSize="small" />
  </RepositoryContainer>
};


export default Repository;