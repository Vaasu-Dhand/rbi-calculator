import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { evaluator } from '../utils/cloud-evaluate';

import type { RootState } from './store';
import { isNumber } from '../utils/helper';
import { ICalculatorState } from '../utils/shared';

const initialState: ICalculatorState = {
  primaryExpression: '',
  secondaryExpression: '0',
  isError: false,
};

function removeSpaces(str: string): string {
  return str.replace(/\s+/g, '');
}

// Async thunk for interacting with evaluate method of cloud-evaluate package.
export const calculateResult = createAsyncThunk<any, number, {state: RootState}>(
  'calculator/calculateResult',
  async (_, { getState, rejectWithValue }) => {
    const expression = getState().calculator.primaryExpression;
    try {
      const result = await evaluator.calculate(removeSpaces(expression));
      console.log('Answer => ', removeSpaces(expression), result);
      
      // API has a 75% chance of working correctly. Handle NaN error.
      if (Number.isNaN(result)) return rejectWithValue({ isError: true, error: 'Error' });
      return { isError: false, result };
    } catch (error) {
      // Handle error for bad expressions
      console.log('Error');
      return rejectWithValue({ isError: true, error: 'Error' });
    }
  }
);

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    buttonClick: (state, { payload }) => {
      console.log(`${payload} clicked`);

      const clickedKey = payload as string;
      const lastCharacter = state.primaryExpression.charAt(
        state.primaryExpression.length - 1
      );
      const endsWithWhiteSpace = lastCharacter === ' ';
      const endsWithANumber = isNumber(lastCharacter);

      switch (payload) {
        case '+':
        case '-':
        case '*':
        case '/':
          if (endsWithANumber) {
            state.primaryExpression = `${state.primaryExpression} ${clickedKey} `;
          }
          break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          state.primaryExpression =
            state.primaryExpression === '0'
              ? clickedKey
              : state.primaryExpression + clickedKey;
          break;
        case 'Escape':
          state.primaryExpression = '';
          state.secondaryExpression = '0';
          state.isError = false;
          break;
        case '.': {
          if (!endsWithANumber) return;
          const expressionArray = state.primaryExpression.split(' ');
          const lastEntity = expressionArray[expressionArray.length - 1];

          const hasDecimal = lastEntity.includes('.');
          // Add decimal if it's not already present
          if (!hasDecimal) {
            state.primaryExpression = state.primaryExpression.concat('.');
          }
          break;
        }
        case 'Backspace': {
          console.log('comes hee');
          
          const hasOnlyOneCharacter = state.primaryExpression.length === 1;
    
          // Return '0' if there's only one character in the expression.
          if (hasOnlyOneCharacter) {
            state.primaryExpression = '0';
          }
          // Remove last 3 characters if expression ends with a space.
          else if (endsWithWhiteSpace) {
            state.primaryExpression = state.primaryExpression.substring(
              0,
              state.primaryExpression.length - 3
            );
          }
          // Remove last character is expression ends with a number.
          else if (endsWithANumber) {
            state.primaryExpression = state.primaryExpression.substring(
              0,
              state.primaryExpression.length - 1
            );
          }
          break;
        }
        default:
          console.error('Action not regonised by reducer!');
          state.isError = true;
          break;
      }
    },
    setPrimaryExpression: (state, { payload }) => {
      state.primaryExpression = payload;
    },
    setSecondaryExpression: (state, { payload }) => {
      state.secondaryExpression = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(calculateResult.fulfilled, (state, action) => {
      console.log('No error', action);
      const result = action.payload.result;
      state.secondaryExpression = String(result);
      state.primaryExpression = '';
    });
    builder.addCase(calculateResult.rejected, (state, action) => {
      console.log('Error', action);
      state.secondaryExpression = 'Error';
    });
  },
});

// Selectors
export const primaryExpression = (state: RootState) =>
  state.calculator.primaryExpression;
export const secondaryExpression = (state: RootState) =>
  state.calculator.secondaryExpression;
export const isError = (state: RootState) => state.calculator.isError;

export const { setPrimaryExpression, setSecondaryExpression, buttonClick } =
  calculatorSlice.actions;

export default calculatorSlice.reducer;
