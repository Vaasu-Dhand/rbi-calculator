import styled, { css } from 'styled-components';

export const Buttons = styled.div`
  padding: 20px 30px;
  height: calc(100% - 110px);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  justify-content: center;
  grid-gap: 10px;
  background: ${({ theme }) => theme.white};
  height: 100%;
  border-radius: 0 0 20px 20px;

  & .two-col {
    grid-column: span 2;
    width: 100%;
  }
  & .hide {
    visibility: hidden;
  }
`;

const clickStyles = () => css`
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.orange};
`;

interface IButtonProps {
  isActive: boolean;
}

export const Button = styled.button<IButtonProps>`
  justify-self: center;
  width: 54px;
  height: 54px;
  background: inherit;
  font-size: 25px;
  border: none;
  border-radius: 50px;

  &.is-symbol {
    background: ${({ theme }) => theme.grey};
  }
  &.equals {
    color: ${({ theme }) => theme.white};
    background: ${({ theme }) => theme.gradient};
    border-radius: 10px;
  }
  transition: all 0.25s linear;

  :hover {
    background: ${({ theme }) => theme.yellow};
  }
  :active {
    ${clickStyles}/* transition: all 0.25s ease-in; */
  }

  ${(props) => {
    if (props.isActive) {
      return clickStyles;
    }
  }}
`;
