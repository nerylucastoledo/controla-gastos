import { render, screen } from '@testing-library/react';
import RecentTransaction from '../recentTransaction';

const mockData = [
  { item: 'Groceries', value: 'R$ 200,00', category: 'Alimentação', id: '1', date: '01/01/2023', people: 'Alice', card: 'Credit' },
  { item: 'Rent', value: 'R$ 1.000,00', category: 'Moradia', id: '2', date: '01/02/2023', people: 'Bob', card: 'Debit' },
  { item: 'Utilities', value: 'R$ 300,00', category: 'Casa', id: '3', date: '01/03/2023', people: 'Lucas', card: 'Credit' },
];

describe('RecentTransaction Component', () => {
  it('should renders with transactions', () => {
    render(<RecentTransaction data={mockData} />);

    expect(screen.getByText(/últimas movimentações/i)).toBeInTheDocument();
    
    const transactions = screen.getAllByTestId('transaction-item');
    expect(transactions.length).toBe(3);
    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.getAllByTestId('transaction-value')[0]).toHaveTextContent('-R$ 300,00');
    expect(screen.getAllByTestId('transaction-people')[0]).toHaveTextContent('Lucas');
    expect(screen.getAllByTestId('transaction-category')[0]).toHaveTextContent('Casa');
  });

  it('should displays empty message when no transactions are provided', () => {
    render(<RecentTransaction data={[]} />);

    expect(screen.getByText(/nenhuma transação encontrada/i)).toBeInTheDocument();
  });

  it('should only shows the last 10 transactions in reverse order', () => {
    const manyTransactions = Array.from({ length: 15 }, (_, index) => ({
      item: `Item ${index + 1}`,
      value: `R$ ${index * 10}`,
      category: 'Outros',
      id: `${index}`,
      date: `01/0${index + 5}/2023`,
      people: 'Alice',
      card: 'Credit',
    }));

    render(<RecentTransaction data={manyTransactions} />);

    const items = screen.getAllByText(/item/i);
    expect(items.length).toBe(10);
    expect(items[0]).toHaveTextContent('Item 15');
    expect(items[9]).toHaveTextContent('Item 6');
  });
});