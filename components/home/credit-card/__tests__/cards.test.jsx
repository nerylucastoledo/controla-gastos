import { render, screen } from '@testing-library/react';
import Cards from '../cards';

const mockExpenses = [
  { item: 'Groceries', value: 'R$ 150', category: 'Alimentação', id: '1', date: '2023-01-01', people: 'Alice', card: 'Visa' },
  { item: 'Rent', value: 'R$ 1000', category: 'Moradia', id: '2', date: '2023-01-02', people: 'Bob', card: 'MasterCard' },
  { item: 'Dining Out', value: 'R$ 200', category: 'Alimentação', id: '3', date: '2023-01-03', people: 'Alice', card: 'Visa' },
];

const mockCards = [
  { _id: '1', name: 'Visa', color: '#1a1a1a' },
  { _id: '2', name: 'MasterCard', color: '#ffcc00' },
];

const mockData = {
  expenses: mockExpenses,
  cards: mockCards,
};

describe('Cards Component', () => {
  it('should renders with cards and expenses', () => {
    render(<Cards data={mockData} date={{ month: '01', year: '2023' }} />);

    expect(screen.getByText(/cartões cadastrados/i)).toBeInTheDocument();
    expect(screen.getByText('Visa')).toBeInTheDocument();
    expect(screen.getAllByTestId('card-total')[0]).toHaveTextContent('R$ 350,00');
    expect(screen.getByText('MasterCard')).toBeInTheDocument();
    expect(screen.getAllByTestId('card-total')[1]).toHaveTextContent('R$ 1.000,00');
  });

  it('should displays empty message when no cards are found', () => {
    render(<Cards data={{ expenses: mockExpenses, cards: [] }} date={{ month: '01', year: '2023' }} />);

    expect(screen.getByText(/nenhuma transação encontrada./i)).toBeInTheDocument();
  });

  it('should calculates totals correctly for each card', () => {
    render(<Cards data={mockData} date={{ month: '01', year: '2023' }} />);

    const visaTotal = screen.getAllByTestId('card-total')[0];
    const masterCardTotal = screen.getAllByTestId('card-total')[1];

    expect(visaTotal).toHaveTextContent('R$ 350,00');
    expect(masterCardTotal).toHaveTextContent('R$ 1.000,00');
  });

  it('should links redirect to correct invoice paths', () => {
    render(<Cards data={mockData} date={{ month: '01', year: '2023' }} />);

    const visaLink = screen.getByText('Visa').closest('a');
    expect(visaLink).toHaveAttribute('href', '/invoice/Visa/012023');

    const masterCardLink = screen.getByText('MasterCard').closest('a');
    expect(masterCardLink).toHaveAttribute('href', '/invoice/MasterCard/012023');
  });
});