import { FC } from 'react';
import { History } from '../components/History';
import styled from 'styled-components';

export const HistoryScreen: FC = () => {
  return (
    <HistoryContainer>
      <History />
    </HistoryContainer>
  );
};

const HistoryContainer = styled.section`
  margin-left: 40px;
`;
