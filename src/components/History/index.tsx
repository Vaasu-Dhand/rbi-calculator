import { FC, useState, useCallback, MouseEvent } from 'react';

import * as Styled from './styles';
import { evaluator } from '../../utils/cloud-evaluate';
import {useStore} from '../../hooks/useStore'

export const History: FC = () => {
  const [expressions, setExpressions] = useState<string[]>([]);
  const {dispatch} = useStore(state => state.calculator)

  const handleOnClick = useCallback(async () => {
    const history = await evaluator.generateHistory();
    setExpressions(history);
  }, []);

  const handleExpressionClick = (event: MouseEvent<HTMLLIElement>) => {
    const { innerText } = event.currentTarget;
    const [primaryExpression, secondaryExpression] = innerText.split('=');

    dispatch({type: 'SET_PRIMARY_EXPRESSION', payload: primaryExpression});
    dispatch({type: 'SET_SECONDARY_EXPRESSION', payload: secondaryExpression});
  };

  return (
    <>
      <Styled.GenerateBtn onClick={handleOnClick} data-testid='generate-history-btn'>Generate</Styled.GenerateBtn>
      <Styled.CalculationHistory data-testid='history-list'>
        {expressions.map((expression, index) => (
          <Styled.ListItem key={index} onClick={handleExpressionClick}>
            {expression}
          </Styled.ListItem>
        ))}
      </Styled.CalculationHistory>
    </>
  );
};
