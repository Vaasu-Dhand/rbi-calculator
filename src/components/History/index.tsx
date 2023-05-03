import React, { FC, useState, useCallback, MouseEvent } from 'react';

import * as Styled from './styles';
import { evaluator } from '../../utils/cloud-evaluate';
import {
  setPrimaryExpression,
  setSecondaryExpression,
} from '../../redux/calculator.slice.old';
import { useCalculatorContext } from '../../context/calculator/useCalculatorContext';

// import { useAppDispatch } from '../../redux/hooks';

export const History: FC = () => {
  const [expressions, setExpressions] = useState<string[]>([]);
  const {dispatch} = useCalculatorContext()

  const handleOnClick = useCallback(async () => {
    const history = await evaluator.generateHistory();
    setExpressions(history);
  }, []);

  const handleExpressionClick = (event: MouseEvent<HTMLLIElement>) => {
    const { innerText } = event.currentTarget;
    const [primaryExpression, secondaryExpression] = innerText.split('=');

    // dispatch(setPrimaryExpression(primaryExpression));
    dispatch({type: 'SET_PRIMARY_EXPRESSION', payload: primaryExpression});
    // dispatch(setSecondaryExpression(secondaryExpression));
    dispatch({type: 'SET_SECONDARY_EXPRESSION', payload: secondaryExpression});
  };

  return (
    <>
      <Styled.GenerateBtn onClick={handleOnClick}>Generate</Styled.GenerateBtn>
      <Styled.CalculationHistory>
        {expressions.map((expression, index) => (
          <Styled.ListItem key={index} onClick={handleExpressionClick}>
            {expression}
          </Styled.ListItem>
        ))}
      </Styled.CalculationHistory>
    </>
  );
};
