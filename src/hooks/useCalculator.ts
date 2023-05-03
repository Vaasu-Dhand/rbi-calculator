import { useContext } from 'react';
import { CalculatorContext } from '../components/CalculatorContext';

/**
 * Custom hook that exposes calculator state stored in React Context and dispatch function from useReducer.
 */
export const useCalculator = () => {
  return useContext(CalculatorContext);
};
