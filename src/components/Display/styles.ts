import styled from 'styled-components';

export const Screen = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.white};
  border-radius: 20px 20px 0 0;
  background: ${({ theme }) => theme.gradient};
  padding: 20px 10px;
`

// Share styles in these
export const PrimaryScreen = styled.div`
  height: 75px;
  width: 100%;
  font-size: 20px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-weight: bold;
  box-sizing: border-box;
`

export const SecondaryScreen = styled.div`
  display: flex;
  height: 75px;
  width: 100%;
  font-size: 40px;
  padding: 0 10px;
  
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-weight: bold;
  box-sizing: border-box;
  
`