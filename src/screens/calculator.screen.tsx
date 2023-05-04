import { FC } from 'react';
import styled from 'styled-components';

import { Display } from '../components/Display';
import { Buttons } from '../components/Buttons';
export const CalculatorScreen: FC = () => {
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
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;
