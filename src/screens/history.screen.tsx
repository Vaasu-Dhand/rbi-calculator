import { FC } from 'react';
import styled from 'styled-components';

import { History } from '../components/History';

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
