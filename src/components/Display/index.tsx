import { FC } from 'react';

import * as Styled from './styles';
import { useStore } from '../../hooks/useStore';

function formatExpression(expression: string): string {
  const formattedExpr = expression.replace(/\*/g, 'x').replace(/\//g, '÷');
  return formattedExpr;
}

export const Display: FC = () => {
  const {
    state: { primaryExpression, secondaryExpression },
  } = useStore((state) => state.calculator);

  return (
    <Styled.Screen data-testid='display-expression'>
      <Styled.SecondaryScreen data-testid='secondary-expression'>{secondaryExpression}</Styled.SecondaryScreen>
      <Styled.PrimaryScreen data-testid='primary-expression'>{formatExpression(primaryExpression)}</Styled.PrimaryScreen>
    </Styled.Screen>
  );
};
