import React, { FC } from 'react';

import * as Styled from './styles';
import { useCalculatorContext } from '../../context/calculator/useCalculatorContext';

export const Display: FC = (props) => {
  const {
    state: { primaryExpression, secondaryExpression },
  } = useCalculatorContext();

  console.log(props);
  return (
    <Styled.Screen>
      {/* TODO: Both of these would format big numbers */}
      <Styled.SecondaryScreen>{secondaryExpression}</Styled.SecondaryScreen>
      <Styled.PrimaryScreen>{primaryExpression}</Styled.PrimaryScreen>
    </Styled.Screen>
  );
};
