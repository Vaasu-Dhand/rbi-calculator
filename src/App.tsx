import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import { CalculatorScreen } from './screens/calculator.screen.tsx';
import { HistoryScreen } from './screens/history.screen.tsx';
import { Navbar } from './components/Navbar';
import { GlobalStyles } from './utils/globalStyles';
import { theme } from './utils/theme';
import { CalculatorContextProvider } from './context/calculator/calculator.context.tsx';

const App = () => {
  return (
    <div className="App" data-testid="app">
      <CalculatorContextProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Navbar />
          <Routes>
            <Route path="/" element={<CalculatorScreen />} />
            <Route path="history" element={<HistoryScreen />} />
          </Routes>
        </ThemeProvider>
      </CalculatorContextProvider>
    </div>
  );
};

export default App;
