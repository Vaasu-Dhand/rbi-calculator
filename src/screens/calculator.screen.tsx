import React, { FC } from 'react';
import styled from 'styled-components';

import { Display } from '../components/Display';
import { Buttons } from '../components/Buttons';
export const CalculatorScreen: FC = (props) => {
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <CalculatorContainer>
        <Display />
        <Buttons />
      </CalculatorContainer>
    </div>
  );
};

const CalculatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 500px) {
    width: 75%;
  }
  @media (min-width: 600px) {
    width: 50%;
  }
`;
