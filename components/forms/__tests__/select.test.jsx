import { render, screen, fireEvent } from '@testing-library/react';
import Select from '../select';

const mockHandleChange = jest.fn();

describe('Select Component', () => {
  it('should renders Select with label and options', () => {
    const options = ['Option 1', 'Option 2', 'Option 3'];

    render(<Select options={options} id="select-test" label="Choose an option" handleChange={mockHandleChange} />);

    expect(screen.getByLabelText(/choose an option/i)).toBeInTheDocument();
    const selectElement = screen.getByRole('combobox');

    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveProperty('options.length', 3);
  });

  it('should calls handleChange on option selection', () => {
    const options = ['Option 1', 'Option 2', 'Option 3'];
    
    render(<Select options={options} id="select-test" handleChange={mockHandleChange} />);

    const selectElement = screen.getByRole('combobox');

    fireEvent.change(selectElement, { target: { value: 'Option 2' } });

    expect(mockHandleChange).toHaveBeenCalledWith('Option 2');
  });

  it('should renders with default value if provided', () => {
    const options = ['Option 1', 'Option 2', 'Option 3'];

    render(<Select options={options} id="select-test" defaultValue="Option 2" handleChange={mockHandleChange} />);

    const selectElement = screen.getByRole('combobox');

    expect(selectElement).toHaveValue('Option 2');
  });

  it('should renders without label if not provided', () => {
    const options = ['Option 1', 'Option 2', 'Option 3'];

    render(<Select options={options} id="select-test" handleChange={mockHandleChange} />);

    expect(screen.queryByLabelText(/choose an option/i)).not.toBeInTheDocument();
  });
})