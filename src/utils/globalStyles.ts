import { createGlobalStyle } from 'styled-components';

import {ITheme} from './theme';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({theme}: {theme: ITheme}) => theme.grey};
    color: ${({theme}: {theme: ITheme}) => theme.black};
  }
`