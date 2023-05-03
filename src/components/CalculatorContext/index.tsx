// import React, { createContext, useReducer, ReactNode } from 'react';
// import {produce} from 'immer'

// import { calculatorReducer } from '../../utils/calculatorReducer';
// import { CalculatorAction, ICalculatorState } from '../../utils/shared';

// const initialState: ICalculatorState = {
//   primaryExpression: '0',
//   secondaryExpression: '',
//   isError: false,
// };

// const reducer = produce(calculatorReducer);

// export const CalculatorContext = createContext<ICalculatorContext>({
//   state: initialState,
//   dispatch: () => {},
// });

// export const CalculatorProvider = ({ children }: { children: ReactNode }) => {
//   const [state, dispatch] = useReducer<
//     React.Reducer<ICalculatorState, CalculatorAction>
//   >(reducer, initialState);

//   return (
//     <CalculatorContext.Provider value={{ state, dispatch }}>
//       {children}
//     </CalculatorContext.Provider>
//   );
// };

// interface ICalculatorContext {
//   state: ICalculatorState;
//   dispatch: React.Dispatch<CalculatorAction>;
// }
