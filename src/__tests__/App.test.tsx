import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Mock the useApi hook
jest.mock('../hooks/useApi', () => ({
  useApi: () => ({
    data: null,
    isLoading: false,
    error: null,
    execute: jest.fn(),
    reset: jest.fn(),
  }),
}));

describe('App Component', () => {
  test('renders the main header', () => {
    render(<App />);
    const headerElement = screen.getByText('React TypeScript Starter');
    expect(headerElement).toBeInTheDocument();
  });

  test('renders the subtitle', () => {
    render(<App />);
    const subtitleElement = screen.getByText('Ready for daily projects');
    expect(subtitleElement).toBeInTheDocument();
  });

  test('renders component examples section', () => {
    render(<App />);
    const componentSection = screen.getByText('Component Examples');
    expect(componentSection).toBeInTheDocument();
  });

  test('renders API integration section', () => {
    render(<App />);
    const apiSection = screen.getByText('API Integration');
    expect(apiSection).toBeInTheDocument();
  });

  test('renders utility functions section', () => {
    render(<App />);
    const utilitySection = screen.getByText('Utility Functions');
    expect(utilitySection).toBeInTheDocument();
  });

  test('renders project structure section', () => {
    render(<App />);
    const projectSection = screen.getByText('Project Structure');
    expect(projectSection).toBeInTheDocument();
  });

  test('input field updates when typing', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Enter some text...');
    fireEvent.change(input, { target: { value: 'test input' } });
    expect(input).toHaveValue('test input');
  });

  test('search input field updates when typing', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText('Enter search term...');
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    expect(searchInput).toHaveValue('test search');
  });

  test('button click shows alert', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<App />);

    const primaryButton = screen.getByText('Primary');
    fireEvent.click(primaryButton);

    expect(alertMock).toHaveBeenCalledWith('Primary button clicked!');
    alertMock.mockRestore();
  });
});
