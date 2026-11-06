import { render, screen } from '@testing-library/react';
import InstallmentsByPerson from '../installmentsByPerson';

const mockData = [
  { item: 'Notebook 1 - 3', value: 'R$ 100,00', category: 'Casa', id: '1', date: '112025', people: 'Lucas', card: 'Credit', installment: true },
  { item: 'Notebook 2 - 3', value: 'R$ 100,00', category: 'Casa', id: '2', date: '122025', people: 'Lucas', card: 'Credit', installment: true },
  { item: 'Celular 1 - 2', value: 'R$ 300,00', category: 'Casa', id: '3', date: '112025', people: 'Alessa', card: 'Credit', installment: true },
  { item: 'Mercado', value: 'R$ 50,00', category: 'Alimentação', id: '4', date: '112025', people: 'Eu', card: 'Debit', installment: false },
];

describe('InstallmentsByPerson Component', () => {
  it('should render installments grouped by person with total', () => {
    render(<InstallmentsByPerson data={mockData} />);

    expect(screen.getByText(/parcelas por pessoa/i)).toBeInTheDocument();

    expect(screen.getByText('Lucas')).toBeInTheDocument();
    expect(screen.getByText('R$ 200,00')).toBeInTheDocument();
    expect(screen.getByText('Notebook 1 - 3')).toBeInTheDocument();
    expect(screen.getByText('Notebook 2 - 3')).toBeInTheDocument();

    expect(screen.getByText('Alessa')).toBeInTheDocument();
    expect(screen.getAllByText('R$ 300,00')).toHaveLength(2);
    expect(screen.getByText('Celular 1 - 2')).toBeInTheDocument();

    expect(screen.queryByText('Mercado')).not.toBeInTheDocument();
  });

  it('should display empty message when no installments are provided', () => {
    render(<InstallmentsByPerson data={[]} />);

    expect(screen.getByText(/nenhuma parcela encontrada/i)).toBeInTheDocument();
  });

  it('should display empty message when no expense is an installment', () => {
    render(<InstallmentsByPerson data={[mockData[3]]} />);

    expect(screen.getByText(/nenhuma parcela encontrada/i)).toBeInTheDocument();
  });
});
