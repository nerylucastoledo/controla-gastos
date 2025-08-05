import { render, screen, fireEvent } from '@testing-library/react';
import Submit from '../submit';
import { useFormStatus } from 'react-dom';

jest.mock('react-dom', () => {
  const originalModule = jest.requireActual('react-dom');
  return {
    ...originalModule,
    useFormStatus: jest.fn(),
  };
});

describe('Submit Component', () => {
  it('should renders button with children when not pending', () => {
    useFormStatus.mockReturnValue({ pending: false });

    render(<Submit message="Submitting..." children="Submit" />);

    const button = screen.getByRole('button', { name: /submit/i });
    
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
    expect(button).toHaveTextContent('Submit');
  });

  it('should renders button with loading message and icon when pending', () => {
    useFormStatus.mockReturnValue({ pending: true });

    render(<Submit message="Submitting..." children="Submit" />);

    const button = screen.getByRole('button', { name: /submitting.../i });

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Submitting...');
    expect(screen.getByTestId('loading-icon')).toHaveClass('animate-spin');
  });

  it('should not render the icon when not pending', () => {
    useFormStatus.mockReturnValue({ pending: false });

    render(<Submit message="Submitting..." children="Submit" />);

    expect(screen.queryByTestId('loading-icon')).not.toBeInTheDocument();
  });
})