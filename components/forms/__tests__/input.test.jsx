import { render, screen } from '@testing-library/react';
import Input from '../input';

describe('Input Component', () => {
  it('should renders Input component with label and input', () => {
    render(<Input label="Username" id="username" />);

    const label = screen.getByLabelText(/username/i);
    const input = screen.getByRole('textbox', { name: /username/i });

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'username');
  });

  it('should passes additional props to the input element', () => {
    render(<Input label="Password" id="password" type="password" required />);

    const input = screen.getByLabelText(/password/i);

    expect(input).toHaveAttribute('type', 'password');
    expect(input).toBeRequired();
  });
})