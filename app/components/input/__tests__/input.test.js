import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../input';

describe('Input Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    render(<Input label="Test Label" name="test-input" onChange={mockOnChange} />);
  });

  test('should render the input component with label', () => {
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByTestId('test-input-label')).toBeInTheDocument();
  });

  test('should accept input value', () => {
    const inputElement = screen.getByLabelText('Test Label');
    fireEvent.change(inputElement, { target: { value: 'Hello World' } });
    
    expect(inputElement.value).toBe('Hello World');
    expect(mockOnChange).toHaveBeenCalled();
  });

  test('should have the correct name attribute', () => {
    const inputElement = screen.getByLabelText('Test Label');
    expect(inputElement).toHaveAttribute('name', 'test-input');
  });
});