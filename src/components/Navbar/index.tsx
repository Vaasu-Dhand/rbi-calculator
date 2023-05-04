import { FC } from 'react';

import * as Styled from './styles';

export const Navbar: FC = () => {
  const activeCssClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'active' : '';

  return (
    <Styled.List data-testid='navbar'>
      <Styled.Link to="/" className={activeCssClass}>
        Calculator
      </Styled.Link>
      |
      <Styled.Link to="/history" className={activeCssClass}>
        History
      </Styled.Link>
    </Styled.List>
  );
};
