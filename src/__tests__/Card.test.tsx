import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../components/common/Card';

describe('Card Component', () => {
  test('renders card with children', () => {
    render(
      <Card>
        <div>Card content</div>
      </Card>
    );
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  test('renders card with title', () => {
    render(<Card title="Test Title">Content</Card>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('renders card with subtitle', () => {
    render(<Card subtitle="Test Subtitle">Content</Card>);
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  test('renders card with both title and subtitle', () => {
    render(
      <Card title="Test Title" subtitle="Test Subtitle">
        Content
      </Card>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  test('renders card without title and subtitle', () => {
    render(<Card>Content</Card>);
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<Card className="custom-card">Content</Card>);
    const card = screen.getByText('Content').closest('div');
    expect(card).toHaveClass('custom-card');
  });

  test('renders with different padding options', () => {
    const { rerender } = render(<Card padding="none">Content</Card>);
    let card = screen.getByText('Content').closest('div');
    expect(card).toHaveClass('paddingNone');

    rerender(<Card padding="small">Content</Card>);
    card = screen.getByText('Content').closest('div');
    expect(card).toHaveClass('paddingSmall');

    rerender(<Card padding="large">Content</Card>);
    card = screen.getByText('Content').closest('div');
    expect(card).toHaveClass('paddingLarge');
  });

  test('renders with different shadow options', () => {
    const { rerender } = render(<Card shadow="none">Content</Card>);
    let card = screen.getByText('Content').closest('div');
    expect(card).toHaveClass('shadowNone');

    rerender(<Card shadow="small">Content</Card>);
    card = screen.getByText('Content').closest('div');
    expect(card).toHaveClass('shadowSmall');

    rerender(<Card shadow="large">Content</Card>);
    card = screen.getByText('Content').closest('div');
    expect(card).toHaveClass('shadowLarge');
  });
});