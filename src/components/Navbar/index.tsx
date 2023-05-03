import React, { FC } from 'react';

import * as Styled from './styles';

// TODO: Fix: Active classname not working
export const Navbar: FC = () => {
  const activeCssClass = ({ isActive }: { isActive: boolean }) => {
    return isActive ? 'active' : undefined;
  };

  return (
    <Styled.List>
      <li>
        <Styled.Link to="/" className={activeCssClass}>
          Calculator
        </Styled.Link>
      </li>
      |
      <li>
        <Styled.Link to="history">History</Styled.Link>
      </li>
    </Styled.List>
  );
};
