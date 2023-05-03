import { evaluator } from '../utils/cloud-evaluate';

import type { RootState } from './store';
import { isNumber } from '../utils/helper';
import { ICalculatorState } from '../utils/shared';
import produce from 'immer';

const SLICE = 'CALCULATOR';

// Constants
const BUTTON_CLICK = `${SLICE}/BUTTON_CLICK`;
const SET_PRIMARY_EXPRESSION = `${SLICE}/SET_PRIMARY_EXPRESSION`;
const SET_SECONDARY_EXPRESSION = `${SLICE}/SET_SECONDARY_EXPRESSION`;
const CALCULATE_RESULT_SUCCESS = `${SLICE}/CALCULATE_RESULT_SUCCESS`;
const CALCULATE_RESULT_FAIL = `${SLICE}/CALCULATE_RESULT_FAILED`;

// Actions
export function buttonClick(payload) {
  return {
    type: BUTTON_CLICK,
    payload,
  };
}

export function setPrimaryExpression(payload: string) {
  return {
    type: SET_PRIMARY_EXPRESSION,
    payload,
  };
}

export function setSecondaryExpression(payload: string) {
  return {
    type: SET_SECONDARY_EXPRESSION,
    payload,
  };
}

function removeSpaces(str: string): string {
  return str.replace(/\s+/g, '');
}

// Async thunk for interacting with evaluate method of cloud-evaluate package.
export const calculateResult = async (dispatch, expression) => {
  // const expression = getState().calculator.primaryExpression;
  try {
    const result = await evaluator.calculate(removeSpaces(expression));
    console.log('Answer => ', removeSpaces(expression), result);
    // API has a 75% chance of working correctly. Handle NaN error.
    if (Number.isNaN(result))
      return dispatch({
        type: CALCULATE_RESULT_FAIL,
        payload: { isError: true, error: 'Error' },
      });
    dispatch({
      type: CALCULATE_RESULT_SUCCESS,
      payload: { isError: false, result },
    });
    // return { isError: false, result };
  } catch (error) {
    // Handle error for bad expressions
    console.log('Error');
    // return rejectWithValue({ isError: true, error: 'Error' });
    dispatch({
      type: CALCULATE_RESULT_FAIL,
      payload: { isError: true, error: 'Error' },
    });
  }
};

const initialState: ICalculatorState = {
  primaryExpression: '',
  secondaryExpression: '0',
  isError: false,
};

// Reducer
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case BUTTON_CLICK: {
        console.log(`${action.payload} clicked`);

        const clickedKey = action.payload as string;
        const lastCharacter = state.primaryExpression.charAt(
          state.primaryExpression.length - 1
        );
        const endsWithWhiteSpace = lastCharacter === ' ';
        const endsWithANumber = isNumber(lastCharacter);

        switch (action.payload) {
          case '+':
          case '-':
          case '*':
          case '/':
            if (endsWithANumber) {
              draft.primaryExpression = `${draft.primaryExpression} ${clickedKey} `;
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
            draft.primaryExpression =
              draft.primaryExpression === '0'
                ? clickedKey
                : draft.primaryExpression + clickedKey;
            break;
          case 'Escape':
            draft.primaryExpression = '';
            draft.secondaryExpression = '0';
            draft.isError = false;
            break;
          case '.': {
            if (!endsWithANumber) return;
            const expressionArray = draft.primaryExpression.split(' ');
            const lastEntity = expressionArray[expressionArray.length - 1];

            const hasDecimal = lastEntity.includes('.');
            // Add decimal if it's not already present
            if (!hasDecimal) {
              draft.primaryExpression = draft.primaryExpression.concat('.');
            }
            break;
          }
          case 'Backspace': {
            console.log('comes hee');

            const hasOnlyOneCharacter = draft.primaryExpression.length === 1;

            // Return '0' if there's only one character in the expression.
            if (hasOnlyOneCharacter) {
              draft.primaryExpression = '0';
            }
            // Remove last 3 characters if expression ends with a space.
            else if (endsWithWhiteSpace) {
              draft.primaryExpression = draft.primaryExpression.substring(
                0,
                draft.primaryExpression.length - 3
              );
            }
            // Remove last character is expression ends with a number.
            else if (endsWithANumber) {
              draft.primaryExpression = draft.primaryExpression.substring(
                0,
                draft.primaryExpression.length - 1
              );
            }
            break;
          }
          default:
            console.error('Action not regonised by reducer!');
            draft.isError = true;
            break;
        }
        break;
      }

      case SET_PRIMARY_EXPRESSION:
        draft.primaryExpression = action.payload;
        break;
      case SET_SECONDARY_EXPRESSION:
        state.secondaryExpression = action.payload;
        break;
      default:
        console.log('in default');
        break;
      // return state;
    }
  });

export default reducer;
