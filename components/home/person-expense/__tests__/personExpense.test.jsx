import { render, screen } from '@testing-library/react';
import PersonExpense from '../personExpense';

const mockData = [
  { item: 'Groceries', value: 'R$ 100', category: 'Alimentação', id: '1', date: '2023-01-01', people: 'Alice', card: 'Credit' },
  { item: 'Utilities', value: 'R$ 200', category: 'Casa', id: '2', date: '2023-01-05', people: 'Bob', card: 'Debit' },
  { item: 'Dining Out', value: 'R$ 150', category: 'Alimentação', id: '3', date: '2023-01-07', people: 'Alice', card: 'Credit' },
];

describe('PersonExpense Component', () => {
  it('should renders with expenses grouped by person', () => {
    render(<PersonExpense data={mockData} />);
    
    expect(screen.getByText(/gasto por pessoa/i)).toBeInTheDocument();

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('R$ 250,00')).toBeInTheDocument(); 
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('R$ 200,00')).toBeInTheDocument();
  });

  it('should displays empty message when no expenses are provided', () => {
    render(<PersonExpense data={[]} />);
    
    expect(screen.getByText(/nenhum gasto encontrado/i)).toBeInTheDocument();
  });
});