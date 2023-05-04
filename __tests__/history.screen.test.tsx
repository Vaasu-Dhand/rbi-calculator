class MockEvaluator {
  calculate = jest.fn(() => Promise.resolve(42));
  generateHistory = jest.fn(() => Promise.resolve(['1+2=3', '4-2=2']));
}

// @ts-ignore
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import { HistoryScreen } from '../src/screens/history.screen';
import { AppContextProvider } from '../src/context/AppContext';

jest.mock('cloud-evaluate', () => ({
  Evaluator: MockEvaluator,
}));

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

  it('should render an empty <ul> element, when no history present', async () => {
    const historyList = getByTestId('history-list');

    expect(historyList).toBeEmptyDOMElement();
  });

  it('should render expressions when generate button is clicked', async () => {
    const generateHistoryBtn = getByTestId('generate-history-btn');
    const historyList = getByTestId('history-list');

    await act(async () => {
      fireEvent.click(generateHistoryBtn);
    });

    expect(historyList.children).toHaveLength(2);
  });
});
