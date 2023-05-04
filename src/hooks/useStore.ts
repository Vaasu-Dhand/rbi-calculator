import {useContext} from 'react';
import {CalculatorContext} from '../context/calculator/CalculatorContext'


type Contexts = {
  calculator: typeof CalculatorContext
}

// Add more contexts as the application grows
const contexts: Contexts = {
  calculator: CalculatorContext,
};

// Custom hook that provides access to all contexts.
export const useStore = <T>(selectorFn: (contexts: Contexts) => React.Context<T>): T => {
  return useContext(selectorFn(contexts));
};
