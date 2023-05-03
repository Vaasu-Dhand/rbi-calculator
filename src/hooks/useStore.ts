import { useContext } from "react";
import { CalculatorContext } from "../context/calculator/calculator.context";

// Add more stores as the application grows
const stores = {
  calculator: CalculatorContext,
}


export function useStore(key: string) {
  const context = stores[key];
  const state = useContext(context);
  return state;
}