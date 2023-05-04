import styled, { css } from 'styled-components';

export const Screen = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.white};
  border: inherit;
  border-radius: 20px 20px 0 0;
  background: ${({ theme }) => theme.gradient};
  padding: 80px 32px 32px 32px;
  max-width: 376px;
`;

const screenStyles = css`
  display: flex;
  height: 50px;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  font-weight: bold;
  box-sizing: border-box;
`;

export const PrimaryScreen = styled.div`
  ${screenStyles};
  font-weight: 400;
  overflow: auto;
  font-size: 24px;
`;

export const SecondaryScreen = styled.div`
  ${screenStyles};
  font-size: 48px;
  line-height: 48px;
  font-weight: 900;
`;
