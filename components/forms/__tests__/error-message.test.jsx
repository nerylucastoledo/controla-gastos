import { render, screen } from '@testing-library/react';
import ErrorMessage from '../error-message';

describe('ErrorMessage Component', () => {
  it('should does not render ErrorMessage when error prop is empty', () => {
    render(<ErrorMessage error="" />);
    
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });

  it('should renders ErrorMessage when error prop is provided', () => {
    const errorText = "An error occurred!";
    
    render(<ErrorMessage error={errorText} />);
    
    expect(screen.getByText(errorText)).toBeInTheDocument();
    expect(screen.getByText(errorText)).toHaveClass('error');
  });
})