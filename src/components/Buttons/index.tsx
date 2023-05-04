import React, {
  FC,
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import * as Styled from './styles';
import { BUTTON_MAP } from '../../utils/constants';
import { evaluator } from '../../utils/cloud-evaluate';
import { useStore } from '../../hooks/useStore';
import { endsWithANumber } from '../../utils/helper';

function removeSpaces(str: string): string {
  return str.replace(/\s+/g, '');
}

export const Buttons: FC = () => {
  const {
    dispatch,
    state: { primaryExpression },
  } = useStore((state) => state.calculator);

  type ButtonRef = React.RefObject<HTMLButtonElement>;

  const [activeBtnIdx, setActiveBtnIdx] = useState<number | null>(null);

  // Generate a React ref containing an array of button element refs.
  const elementsRef = useRef(
    BUTTON_MAP.flat().map(({ key }) => ({
      key,
      buttonRef: createRef() as ButtonRef,
    }))
  );

  const calculateResult = useCallback(async () => {
    try {
      const result = await evaluator.calculate(removeSpaces(primaryExpression));

      // API has a 75% chance of working correctly. Handle NaN error.
      if (Number.isNaN(result)) {
        return dispatch({
          type: 'CALCULATE_RESULT_FAIL',
          payload: { isError: true, error: 'Error' },
        });
      }
      dispatch({
        type: 'CALCULATE_RESULT_SUCCESS',
        payload: { isError: false, result },
      });
    } catch (error) {
      // Handle error for bad expressions
      dispatch({
        type: 'CALCULATE_RESULT_FAIL',
        payload: { isError: true, error: 'Error' },
      });
    }
  }, [dispatch, primaryExpression]);

  // calls calculateResult if the primary expression is valid.
  const handleEquate = useCallback(() => {
    const shouldCalculateResult =
      primaryExpression.length > 0 && endsWithANumber(primaryExpression);
    if (shouldCalculateResult) calculateResult();
  }, [primaryExpression, calculateResult]);

  // Dispatches appropriate action based on the button clicked.
  const handleButtonClick = useCallback(
    (btn: string) => {
      if (btn === 'Enter') {
        handleEquate();
        return;
      }

      dispatch({ type: 'BUTTON_CLICK', payload: btn });
    },
    [dispatch, handleEquate]
  );

  // Handles key binding & triggers animation by setting active button index.
  useEffect(() => {
    const handleKeyPress = ({ key: clickedKey }: { key: string }) => {
      handleButtonClick(clickedKey);

      // Find index of button pressed to fire animation.
      const foundButtonIdx = elementsRef.current.findIndex(
        ({ key: elementKey }) => clickedKey === elementKey
      );
      if (foundButtonIdx === -1) return;
      setActiveBtnIdx(foundButtonIdx);
      setTimeout(() => {
        setActiveBtnIdx(null);
      }, 150);
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [dispatch, handleButtonClick]);

  return (
    <Styled.Buttons>
      {BUTTON_MAP.flat().map(({ display, key, className, testId }, i) => (
        <Styled.Button
          key={i}
          className={className}
          isActive={i === activeBtnIdx}
          data-testid={testId}
          ref={elementsRef.current[i].buttonRef}
          onClick={() => handleButtonClick(key)}
        >
          {display}
        </Styled.Button>
      ))}
    </Styled.Buttons>
  );
};
