import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/layout/Header';

describe('Header Component', () => {
  test('renders header with default title', () => {
    render(<Header />);
    expect(screen.getByText('Daily Project')).toBeInTheDocument();
  });

  test('renders header with custom title', () => {
    render(<Header title="Custom Title" />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  test('renders header with subtitle', () => {
    render(<Header subtitle="Custom Subtitle" />);
    expect(screen.getByText('Custom Subtitle')).toBeInTheDocument();
  });

  test('renders header with both title and subtitle', () => {
    render(<Header title="Custom Title" subtitle="Custom Subtitle" />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom Subtitle')).toBeInTheDocument();
  });

  test('does not render back button by default', () => {
    render(<Header />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  test('renders back button when showBackButton is true', () => {
    render(<Header showBackButton />);
    const backButton = screen.getByRole('button');
    expect(backButton).toBeInTheDocument();
  });

  test('handles back button click', () => {
    const handleBackClick = jest.fn();
    render(<Header showBackButton onBackClick={handleBackClick} />);

    const backButton = screen.getByRole('button');
    fireEvent.click(backButton);

    expect(handleBackClick).toHaveBeenCalledTimes(1);
  });

  test('applies custom className', () => {
    render(<Header className="custom-header" />);
    const header = screen.getByText('Daily Project').closest('header');
    expect(header).toHaveClass('custom-header');
  });
});