# RBI Calculator

## Description
RBI Calculator is a simple calculator that can perform basic arithmetic operations such as addition, subtraction, multiplication, and division. It makes use of `cloud-evaluate`. The calculator provides the ability to reset the calculation. The output area will resize automatically based on the length of the calculation.

## Features
- Addition, subtraction, multiplication, and division operations are supported.
- Go back in time with history.
- Supports keyboard events.
- Clear functionality to clear the calculation (`Esc`).
- Handles error thrown by `cloud-evalaute` API by displaying 'Error' in the output.
- The display screen will resize based on the length of the calculation.
- Resonsive design to fit all screen sizes.

## Component Map
<table>
  <tr>
    <td class="col1">Calculator Screen</td>
    <td class="col2"><img src="./public/CalculatorScreen.png" alt="Calculator screen"></td>
  </tr>
  <tr>
    <td class="col1">History Screen</td>
    <td class="col2"><img src="./public/HistoryScreen.png" alt="History screen"></td>
  </tr>
</table>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  td {
    padding: 10px;
    text-align: center;
  }
  
  .col1 {
    width: 10%;
  }
  
  .col2 {
    width: 50%;
  }
  
  img {
    width: 100%;
  }
</style>



## Application Design
The application has been designed with scalability and extendibility in mind. The folder structure is well-organized and can accommodate growth as the application expands. The state management system is built using React Context and provides a centralized location for managing the state of the application. 

## State Management
The applciation leverages React's Context API as a global state management solution. The `context` folder can be extended to store different contexts.

### Some important functions are described below:
- `combineComponents` - This is utility function that combines all the ContextProviders being used in the app to return a single ContextProvider (`AppContextProvider`). This is very similar to `combineReducers` from the redux world. 

This gives us two benefits:
  
  1. Reduces JSX.
  2. As we know, the order of Context Provider's matters. It eliminates this complexity as we're only wrapping our application with a single ContextProvider.

- `AppContext`: It is the global app context formed by combining all Contexts.
- `useStore`: Custom hook for accessing App context. 

Usage: 
```jsx
const {foo, bar} = useStore(state => state.contextName)
```

## Key Bindings
- `Esc` : Clear
- `+` : Add operator
- `-`: Subtract operator
- `*` : Multiply operator
- `/` : Divide operator
- `Enter`: Equals operator
- `.`: Decimal
- `0-9`: Digits
- `Backspace`: Delete

## Author
Vaasu Dhand