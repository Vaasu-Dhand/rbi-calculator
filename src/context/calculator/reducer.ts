import { isNumber } from '../../utils/helper';
import { CalculatorAction, ICalculatorState } from '../../utils/shared';

export function calculatorReducer(
  draft: ICalculatorState,
  action: CalculatorAction
) {
  const clickedKey = action.payload as string;
  const lastCharacter = draft.primaryExpression.charAt(
    draft.primaryExpression.length - 1
  );
  const endsWithWhiteSpace = lastCharacter === ' ';
  const endsWithANumber = isNumber(lastCharacter);

  switch (action.type) {
    case 'BUTTON_CLICK':
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
          break;
      }
      break;
    case 'SET_PRIMARY_EXPRESSION':
      draft.primaryExpression = action.payload as string;
      break;
    case 'SET_SECONDARY_EXPRESSION':
      draft.secondaryExpression = action.payload as string;
      break;
    case 'CALCULATE_RESULT_SUCCESS':
      {
        const { result } = action.payload;
        draft.secondaryExpression = String(result);
        draft.primaryExpression = '';
      }
      break;
    case 'CALCULATE_RESULT_FAIL':
      draft.secondaryExpression = 'Error';
      break;
    default:
      break;
  }
}
