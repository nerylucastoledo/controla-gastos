import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from '../select';

describe('Select Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    render(
      <Select id="test-select" label="Test Label" onChange={mockOnChange}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </Select>
    );
  });

  test('should render the select component with label', () => {
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  test('should render options within the select', () => {
    expect(screen.getByRole('option', { name: 'Option 1' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option 2' })).toBeInTheDocument();
  });

  test('should call onChange when an option is selected', () => {
    const selectElement = screen.getByLabelText('Test Label');
    fireEvent.change(selectElement, { target: { value: 'option2' } });
    
    expect(mockOnChange).toHaveBeenCalled();
    expect(selectElement.value).toBe('option2');
  });
});