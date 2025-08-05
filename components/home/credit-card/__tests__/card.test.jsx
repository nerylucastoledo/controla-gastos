import { render, screen } from '@testing-library/react';
import Card from '../card';

describe('Card Component', () => {
  it('should renders Card with correct props', () => {
    render(<Card name="Visa" color="#1a1a1a" total={150.75} />);

    expect(screen.getByText('Visa')).toBeInTheDocument();
    expect(screen.getByText('Fatura atual')).toBeInTheDocument();
    expect(screen.getByTestId('card-total')).toHaveTextContent('R$ 150,75');
    expect(screen.getByText('**** **** **** ****')).toBeInTheDocument();

    expect(screen.getByTestId('card-component')).toHaveStyle('background-color: rgb(26, 26, 26)');
  });

  it('should formats total amount correctly', () => {
    render(<Card name="MasterCard" color="#ffcc00" total={2500} />);

    expect(screen.getByTestId('card-total')).toHaveTextContent('R$ 2.500,00');
  });
});