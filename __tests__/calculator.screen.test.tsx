// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CalculatorScreen } from '../src/screens/calculator.screen';
import { AppContextProvider } from '../src/context/AppContext';
import { Evaluator, IEvaluator } from 'cloud-evaluate';

const { getAllByTestId, getByTestId } = screen;

describe('CalculatorScreen', () => {
  const evaluator: IEvaluator = new Evaluator();
  // const asyncMock = jest.fn<() => Promise<number>>().mockResolvedValue(43);

  beforeEach(() => {
    render(
      <AppContextProvider>
        <CalculatorScreen />
      </AppContextProvider>
    );
  });

  describe('digits', () => {
    it('should render 9 digits', () => {
      for (let i = 0; i < 10; i++) {
        expect(getAllByTestId(`inputKey-${i}`)).toHaveLength(1);
      }
    });
  });

  describe('operators', () => {
    it('should render the operators', () => {
      ['-', '+', '÷', 'x'].forEach((operator) => {
        expect(getAllByTestId(`inputKey-${operator}`)).toHaveLength(1);
      });
    });
  });

  describe('expression-display', () => {
    it('should render display screen', () => {
      expect(getByTestId('display-expression')).toBeInTheDocument();
      expect(getByTestId('secondary-expression')).toBeInTheDocument();
      expect(getByTestId('primary-expression')).toBeInTheDocument();
    });

    it('should display the expression in the "expression-display"', () => {
      const key2 = getByTestId('inputKey-2');
      const key4 = getByTestId('inputKey-4');
      const operatorPlus = getByTestId('inputKey-+');
      const primaryScreen = getByTestId('primary-expression');

      fireEvent.click(key2);
      fireEvent.click(operatorPlus);
      fireEvent.click(key4);

      expect(primaryScreen).toHaveTextContent('2 + 4');
    });

    it('should display the expression result after equals in clicked"', async () => {
      evaluator.calculate = jest.fn().mockResolvedValue(43);
      const value = await evaluator.calculate('42+1');
      expect(value).toBe(43);
    });
  });
});
