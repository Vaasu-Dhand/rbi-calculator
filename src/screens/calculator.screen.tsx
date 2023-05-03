import React, { FC } from 'react';
import styled from 'styled-components';

import { Display } from '../components/Display';
import { Buttons } from '../components/Buttons';
import { connect } from 'react-redux';
import { buttonClick, calculateResult, setPrimaryExpression, setSecondaryExpression } from '../redux/calculator.slice';
import { useCalculator } from '../hooks/useCalculator';

export const CalculatorScreen: FC = (props) => {
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <CalculatorContainer>
        <Display />
        <Buttons />
      </CalculatorContainer>
    </div>
  );
};

// function mapStateToProps(state) {
//   return {
//     state, // gives our component access to state through props.toDoApp
//   };
// }

// // Wrap with dispatch
// function mapDispatchToProps(dispatch) {
//   return {
//     buttonClick: (key) => dispatch(buttonClick(key)),
//     setPrimaryExpression: (expression) => dispatch(setPrimaryExpression(expression)),
//     setSecondaryExpression: (expression) => dispatch(setSecondaryExpression(expression)),
//     calculateResult: (expression) => dispatch(calculateResult(dispatch, expression)),
//   }; // here we're mapping actions to props
// }

// export default connect(mapStateToProps, mapDispatchToProps)(CalculatorScreen);

const CalculatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 500px) {
    width: 75%;
  }
  @media (min-width: 600px) {
    width: 50%;
  }
`;
