import { createStore, combineReducers } from 'redux'
import calculatorReducer from './calculator.slice.old'

const rootReducer = combineReducers({
  calculator: calculatorReducer,
  // We can add more slices as the application grows.
})

export const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
