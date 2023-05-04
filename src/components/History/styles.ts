import styled from 'styled-components';

export const CalculationHistory = styled.ul`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`;

export const ListItem = styled.li`
  cursor: pointer;
  width: fit-content;
`;

export const GenerateBtn = styled.button`
  border-radius: 13px;
  border: 0;
  font-size: 26px;
  font-weight: 900;
  padding: 5px 15px;
  cursor: pointer;
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.gradient};
`;
