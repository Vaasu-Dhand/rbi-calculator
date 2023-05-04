// @ts-ignore
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { HistoryScreen } from '../src/screens/history.screen';
import { AppContextProvider } from '../src/context/AppContext';

const { getByTestId } = screen;

describe('HistoryScreen', () => {
  beforeEach(() => {
    render(
      <AppContextProvider>
        <HistoryScreen />
      </AppContextProvider>
    );
  });

  it('should render generate history button', () => {
    expect(getByTestId('generate-history-btn')).toBeInTheDocument();
  });

  it('should render an empty <ul> element, when no history present', () => {
    const generateHistoryBtn = getByTestId('generate-history-btn');
    const historyList = getByTestId('history-list');

    fireEvent.click(generateHistoryBtn);

    expect(historyList).toBeEmptyDOMElement();

  });
});
