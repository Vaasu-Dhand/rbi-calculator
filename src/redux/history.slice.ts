import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store';

interface ICalculatorState {
  historyState: []
}

const initialState: ICalculatorState = {
  historyState: []
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setHistory: (state, {payload}) => {
      state.historyState = payload
    },
  },
})

export const primaryExpression = (state: RootState) => state.history.historyState

export default historySlice.reducer