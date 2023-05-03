import { useContext } from 'react';
import { CalculatorContext } from './calculator.context';

/**
 * Custom hook that exposes calculator state stored in React Context and dispatch function from useReducer.
 */
export const useCalculatorContext = () => {
  return useContext(CalculatorContext);
};

