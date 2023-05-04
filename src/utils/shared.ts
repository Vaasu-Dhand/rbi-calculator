export interface ICalculatorState {
  primaryExpression: string;
  secondaryExpression: string;
  isError: boolean;
}

export type CalculatorAction = { type: string; payload?: string | any };