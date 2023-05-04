import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { CalculatorScreen } from '../src/screens/calculator.screen';

const {getAllByTestId, getByTestId} = screen;


describe('CalculatorScreen', () => {
  beforeEach(() => {
    render(<CalculatorScreen />);
  });
  
  describe('digits', () => {
    it('should render 9 digits', () => {
      for (let i = 0; i < 10; i++) {
        expect(getAllByTestId(`inputKey-${i}`)).toHaveLength(1);
      }
    })
  })
  
  describe('operators', () => {
    it('should render the operators', () => {      
      ['-', '+', '/', '*'].forEach(operator => {        
        expect(getAllByTestId(`inputKey-${operator}`)).toHaveLength(1);
      })
    })
  })
  
  describe('expression-display', () => {
    it('should render an expresson display', () => {
      expect(getAllByTestId('expression-display')).toHaveLength(1);
    })
    
    describe('when keys and operators are pressed to form an expression', () => {
      it('should display the expression in the "expression-display"', () => {
        const key2 = getByTestId('inputKey-2');
        const key4 = getByTestId('inputKey-4');
        const operatorPlus = getByTestId('inputKey-+');
        const expressionDisplay = getByTestId('expression-display');
        
        fireEvent.click(key2);
        fireEvent.click(operatorPlus)
        fireEvent.click(key4);
        
        expect(expressionDisplay).toHaveTextContent('2+4')        
      })
    })
  })  
  
})



