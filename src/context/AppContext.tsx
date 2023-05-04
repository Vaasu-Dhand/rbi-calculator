import { ComponentProps, FC } from 'react';
import { CalculatorContextProvider } from './calculator/CalculatorContext';

type ProviderFC = FC<{ children: React.ReactNode }>;

// This Component combines all contexts we can wrap our entire application in the AppContext.
const combineComponents = (...components: ProviderFC[]): ProviderFC => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }: ComponentProps<FC>): JSX.Element => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }) => <>{children}</>,
  );
};

const providers = [
  CalculatorContextProvider,
]

// Global app context
export const AppContextProvider = combineComponents(...providers);