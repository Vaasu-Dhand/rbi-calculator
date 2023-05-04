// @ts-ignore
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from '../src/components/Navbar';

const { getByTestId } = screen;

describe('Navbar', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  });

  it('should render Navbar with two link', () => {
    const navElement = getByTestId('navbar')

    expect(navElement).toBeInTheDocument();
    expect(navElement.children.length).toBe(2);
  });

  it('should contain active class when clicked', () => {
    const [calculatorLink, historyLink] = getByTestId('navbar').children;
    
    expect(calculatorLink).toHaveClass('active');
    expect(historyLink).not.toHaveClass('active');
    
    fireEvent.click(historyLink)

    expect(calculatorLink).not.toHaveClass('active');
    expect(historyLink).toHaveClass('active');
  });
});
