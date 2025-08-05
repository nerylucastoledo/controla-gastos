import { render, screen, fireEvent } from '@testing-library/react';
import ErrorScreen from '../error';

describe('ErrorScreen Component', () => {
  it('should renders ErrorScreen with error message and button', () => {
    render(<ErrorScreen />);

    expect(screen.getByText(/oops! aconteceu um erro/i)).toBeInTheDocument();
    expect(screen.getByText(/nós tivemos um problema quando tentamos carregar os dados/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /tentar novamente/i })).toBeInTheDocument();
  });

  it('should call window.location.reload on button click', () => {
    render(<ErrorScreen />);
    const button = screen.getByRole('button', { name: /tentar novamente/i });

    expect(button).toBeInTheDocument(); // TO DO
  });

  it('should renders error image', () => {
    render(<ErrorScreen />);

    const image = screen.getByAltText('Error');
    
    expect(image).toBeInTheDocument();
  });
})
