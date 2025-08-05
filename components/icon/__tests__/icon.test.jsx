import { render, screen } from '@testing-library/react';
import Icon from '../icon';
import { IoFastFoodOutline } from 'react-icons/io5';

describe('Icon Component', () => {
  it('should renders the correct icon based on name prop', () => {
    render(<Icon name="Alimentação" />);
    
    const iconElement = screen.getByTestId('icon-Alimentação');
    expect(iconElement).toBeInTheDocument();
  expect(iconElement).toBeInTheDocument();
  });

  it('should renders a fallback icon for unknown name prop', () => {
    render(<Icon name="UnknownCategory" />);
    
    const iconElement = screen.getByTestId('icon');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement.tagName).toBe('svg');
  });

  it('should correctly applies color prop to the icon', () => {
    render(<Icon name="Doação" color="red" />);
    
    const iconElement = screen.getByTestId('icon-Doação');
    expect(iconElement).toHaveAttribute('color', 'red');
  });

  it('should renders icon with default color when no color prop is provided', () => {
    render(<Icon name="Educação" />);

    const iconElement = screen.getByTestId('icon-Educação');
    expect(iconElement).toHaveAttribute('color', '#fff');
  });
});
