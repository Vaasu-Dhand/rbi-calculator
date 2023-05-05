class MockEvaluator {
  calculate = jest.fn((expression: string) =>
    Promise.resolve(eval(expression))
  );
  generateHistory = jest.fn(() => Promise.resolve(['1+2=3', '4-2=2']));
}

// @ts-ignore
import React from 'react';
import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CalculatorScreen } from '../src/screens/calculator.screen';
import { AppContextProvider } from '../src/context/AppContext';

jest.mock('cloud-evaluate', () => ({
  Evaluator: MockEvaluator,
}));

const { getAllByTestId, getByTestId } = screen;

describe('CalculatorScreen', () => {
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

    it('should render `C` and `=` symbols', () => {
      expect(getByTestId(`inputKey-C`)).toBeInTheDocument();
      expect(getByTestId(`inputKey-=`)).toBeInTheDocument();
    });
  });

  describe('expression-display', () => {
    it('should render display screen', () => {
      expect(getByTestId('display-expression')).toBeInTheDocument();
      expect(getByTestId('secondary-expression')).toBeInTheDocument();
      expect(getByTestId('primary-expression')).toBeInTheDocument();
    });

    it('should display the expression in the primary screen as the user CLICKS', () => {
      const key2 = getByTestId('inputKey-2');
      const key4 = getByTestId('inputKey-4');
      const operatorPlus = getByTestId('inputKey-+');
      const primaryScreen = getByTestId('primary-expression');

      fireEvent.click(key2);
      fireEvent.click(operatorPlus);
      fireEvent.click(key4);

      expect(primaryScreen).toHaveTextContent('2 + 4');
    });

    it('should display the expression in the primary screen as the user TYPES', () => {
      const primaryScreen = getByTestId('primary-expression');
      act(() => {
        const event = new KeyboardEvent('keydown', {
          key: '1',
          code: 'Digit1',
        });
        document.dispatchEvent(event);
      });

      expect(primaryScreen).toHaveTextContent('1');
    });

    it('should reset the display after (C) button is clicked', async () => {
      const key2 = getByTestId('inputKey-2');
      const key4 = getByTestId('inputKey-4');
      const operatorPlus = getByTestId('inputKey-+');
      const clearBtn = getByTestId('inputKey-C');
      const primaryScreen = getByTestId('primary-expression');
      const secondaryScreen = getByTestId('secondary-expression');

      fireEvent.click(key2);
      fireEvent.click(operatorPlus);
      fireEvent.click(key4);
      fireEvent.click(clearBtn);

      expect(primaryScreen).toHaveTextContent('');
      expect(secondaryScreen).toHaveTextContent('0');
    });

    it('should display correct result for add operand', async () => {
      const key2 = getByTestId('inputKey-2');
      const key4 = getByTestId('inputKey-4');
      const operatorPlus = getByTestId('inputKey-+');
      const keyEquals = getByTestId('inputKey-=');
      const secondaryScreen = getByTestId('secondary-expression');

      fireEvent.click(key2);
      fireEvent.click(operatorPlus);
      fireEvent.click(key4);

      act(() => {
        fireEvent.click(keyEquals);
      });
      await waitFor(() => {
        expect(secondaryScreen).toHaveTextContent('6');
      });
    });

    it('should display correct result for subtract operand', async () => {
      const key2 = getByTestId('inputKey-2');
      const key4 = getByTestId('inputKey-4');
      const operatorSubtract = getByTestId('inputKey--');
      const keyEquals = getByTestId('inputKey-=');
      const secondaryScreen = getByTestId('secondary-expression');

      fireEvent.click(key2);
      fireEvent.click(operatorSubtract);
      fireEvent.click(key4);

      act(() => {
        fireEvent.click(keyEquals);
      });
      await waitFor(() => {
        expect(secondaryScreen).toHaveTextContent('-2');
      });
    });

    it('should display correct result for add operand', async () => {
      const key2 = getByTestId('inputKey-2');
      const key4 = getByTestId('inputKey-4');
      const operatorMultiply = getByTestId('inputKey-x');
      const keyEquals = getByTestId('inputKey-=');
      const secondaryScreen = getByTestId('secondary-expression');

      fireEvent.click(key2);
      fireEvent.click(operatorMultiply);
      fireEvent.click(key4);

      act(() => {
        fireEvent.click(keyEquals);
      });
      await waitFor(() => {
        expect(secondaryScreen).toHaveTextContent('8');
      });
    });

    it('should display correct result for division operand', async () => {
      const key6 = getByTestId('inputKey-6');
      const key3 = getByTestId('inputKey-3');
      const operatorDivide = getByTestId('inputKey-÷');
      const keyEquals = getByTestId('inputKey-=');
      const secondaryScreen = getByTestId('secondary-expression');

      fireEvent.click(key6);
      fireEvent.click(operatorDivide);
      fireEvent.click(key3);

      act(() => {
        fireEvent.click(keyEquals);
      });
      await waitFor(() => {
        expect(secondaryScreen).toHaveTextContent('2');
      });
    });
  });
});
