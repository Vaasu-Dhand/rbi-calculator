// import { calculate } from './cloud-evaluate';
// import { isNumber } from './helper';
// import { CalculatorAction, ICalculatorState } from './shared';

// export async function calculatorReducer(
//   draft: ICalculatorState,
//   action: CalculatorAction
// ) {
  
//   const clickedKey = action.payload as string;

//   const lastCharacter = draft.primaryExpression.charAt(
//     draft.primaryExpression.length - 1
//   );
//   const endsWithWhiteSpace = lastCharacter === ' ';
//   const endsWithANumber = isNumber(lastCharacter);

//   switch (action.payload) {
//     case '+':
//     case '-':
//     case '*':
//     case '/':
//       if (endsWithANumber) {
//         draft.primaryExpression = `${draft.primaryExpression} ${clickedKey} `;
//       }
//       break;
//     case '0':
//     case '1':
//     case '2':
//     case '3':
//     case '4':
//     case '5':
//     case '6':
//     case '7':
//     case '8':
//     case '9':
//       draft.primaryExpression =
//         draft.primaryExpression === '0'
//           ? clickedKey
//           : draft.primaryExpression + clickedKey;
//       break;
//     case 'Enter':
//       {
//         draft.secondaryExpression = draft.primaryExpression;
//         const { isError, error, result } = await calculate(
//           draft.primaryExpression
//         );
//         if (isError) {
//           draft.isError = true
//           console.log('Ran into an issue');
          
//           draft.primaryExpression = 'Could not find result';
//           // draft.error = error;
//         } else {
//           draft.isError = false
//           draft.primaryExpression = String(result);
//         }
//         // Code for history
//         // draft.history.push({
//         //   primaryExpression: draft.primaryExpression,
//         //   secondaryExpression: draft.secondaryExpression,
//         // });
//       }
//       break;
//     case 'Escape':
//       draft.primaryExpression = '0';
//       draft.secondaryExpression = '';
//       draft.isError = false;
//       break;
//     case '.': {
//       if (!endsWithANumber) return;
//       const expressionArray = draft.primaryExpression.split(' ');
//       const lastEntity = expressionArray[expressionArray.length - 1];

//       const hasDecimal = lastEntity.includes('.');
//       // Add decimal if it's not already present
//       if (!hasDecimal) {
//         draft.primaryExpression = draft.primaryExpression.concat('.');
//       }
//       break;
//     }
//     default:
//       console.error('Action not regonised by reducer!');
//       draft.isError = true;
//       break;
//   }
// }
