import styled from 'styled-components';
import { NavLink } from "react-router-dom";

import { ITheme } from '../../utils/theme';

export const List = styled.ul`
  display: flex;
  list-style: none;
  gap: 10px;
`

export const Link = styled(NavLink)`
  color: ${({theme}: {theme: ITheme}) => theme.black};
  text-decoration: none;
  
  &.active {
    text-decoration: underline;
  }
`