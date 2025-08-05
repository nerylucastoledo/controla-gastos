import { render, screen } from '@testing-library/react';
import BudgetSummary from '../budgetSummary';

const mockData = [
  { item: 'Groceries', value: 'R$ 100', category: 'Alimentação', id: '1', date: '2023-01-01', people: 'Eu', card: 'Credit' },
  { item: 'Utilities', value: 'R$ 200', category: 'Casa', id: '2', date: '2023-01-05', people: 'Someone Else', card: 'Credit' },
];

describe('BudgetSummary Component', () => {
  beforeEach(() => {
    localStorage.setItem('salary', '1000');
  });

  afterEach(() => {
    localStorage.removeItem('salary');
  });

  it('should renders with salary, expenses, and remaining balance', () => {
    render(<BudgetSummary data={mockData} />);

    expect(screen.getByText(/receita/i)).toBeInTheDocument();
    expect(screen.getByText(/despesas/i)).toBeInTheDocument();
    expect(screen.getByText(/saldo/i)).toBeInTheDocument();

    expect(screen.getByTestId('salary')).toHaveTextContent('R$ 1.000,00');
    expect(screen.getByTestId('expenses')).toHaveTextContent('R$ 100,00');
    expect(screen.getByTestId('balance')).toHaveTextContent('R$ 900,00');
  });

  it('should calculates remaining balance correctly when total expenses are zero', () => {
    render(<BudgetSummary data={null} />);

    expect(screen.getByTestId('salary')).toHaveTextContent('R$ 1.000,00');
    expect(screen.getByTestId('expenses')).toHaveTextContent('R$ 0,00');
    expect(screen.getByTestId('balance')).toHaveTextContent('R$ 1.000,00');
  });

  it('should handles null expenses gracefully', () => {
    render(<BudgetSummary data={null} />);

    expect(screen.getByTestId('salary')).toHaveTextContent('R$ 1.000,00');
    expect(screen.getByTestId('expenses')).toHaveTextContent('R$ 0,00');
    expect(screen.getByTestId('balance')).toHaveTextContent('R$ 1.000,00');
  });
});