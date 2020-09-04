import React from 'react';
import styled from 'styled-components';


const SpinnerContainer = styled.span`
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

export const Spinner = ({ text }: { text?: string}) => {
    return <SpinnerContainer>{text}</SpinnerContainer>
};

export default Spinner;
