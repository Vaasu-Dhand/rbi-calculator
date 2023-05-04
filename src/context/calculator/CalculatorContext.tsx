import React, { createContext, useReducer, ReactNode } from 'react';
import {produce} from 'immer'

import { calculatorReducer } from './reducer';
import { CalculatorAction, ICalculatorState } from '../../utils/shared';

const initialState: ICalculatorState = {
  primaryExpression: '',
  secondaryExpression: '0',
  isError: false,
};

const reducer = produce(calculatorReducer);

export const CalculatorContext = createContext<ICalculatorContext>({
  state: initialState,
  dispatch: () => {},
});

export const CalculatorContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<
    React.Reducer<ICalculatorState, CalculatorAction>
  >(reducer, initialState);

  return (
    <CalculatorContext.Provider value={{ state, dispatch }}>
      {children}
    </CalculatorContext.Provider>
  );
};

interface ICalculatorContext {
  state: ICalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
}
