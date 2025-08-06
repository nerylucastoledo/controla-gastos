import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewExpenseForm from '../newExpenseForm';
import { billPost } from '../../../actions/bill';
import { useDate } from '../../../context/date-context';
import toast from 'react-hot-toast';

jest.mock('../../../actions/bill');

jest.mock('../../../context/date-context', () => ({
  useDate: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
  success: jest.fn(),
}));

const mockSetDate = jest.fn();

describe('NewExpenseForm', () => {
  const mockPeoples = [{ _id: '1', name: 'Alice' }, { _id: '2', name: 'Bob' }];
  const mockCards = [{ _id: '1', name: 'Credit Card' }, { _id: '2', name: 'Debit Card' }];

  beforeEach(() => {
    (useDate).mockReturnValue({
      date: { month: 'January', year: '2023' },
      setDate: mockSetDate,
    });
  });

  it('renders form with necessary fields', () => {
    render(
      <NewExpenseForm peoples={mockPeoples} cards={mockCards} />
    );

    expect(screen.getByLabelText(/Mês/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ano/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Pessoas/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cartão/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Categoria/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Valor/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Possui parcelas?/i)).toBeInTheDocument();
  });

  it('displays empty state when no cards are present', () => {
    render(
      <NewExpenseForm peoples={mockPeoples} cards={[]} />
    );

    expect(screen.getByText(/Adicione um cartão para adicionar um gasto./i)).toBeInTheDocument();
  });

  it('submits the form successfully', async () => {
    billPost.mockResolvedValue({ ok: true });

    render(
      <NewExpenseForm peoples={mockPeoples} cards={mockCards} />
    );

    fireEvent.change(screen.getByLabelText(/Descrição/i), { target: { value: 'Groceries' } });
    fireEvent.change(screen.getByLabelText(/Valor/i), { target: { value: 'R$ 150,00' } });
    
    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(billPost).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("Despesa adicionada com sucesso!");
    });
  });

  it('shows error toast on failed submission', async () => {
    billPost.mockResolvedValue({ ok: false, error: 'Error adding expense' });

    render(
      <NewExpenseForm peoples={mockPeoples} cards={mockCards} />
    );

    fireEvent.change(screen.getByLabelText(/Descrição/i), { target: { value: 'Groceries' } });
    fireEvent.change(screen.getByLabelText(/Valor/i), { target: { value: 'R$ 150,00' } });

    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(billPost).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith("Erro ao adicionar despesa. Tente novamente!");
    });
  });

  it('handles installments input correctly', () => {
    render(
      <NewExpenseForm peoples={mockPeoples} cards={mockCards} />
    );

    expect(screen.queryByLabelText(/Quantidade de parcelas/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/Possui parcelas?/i));
    
    expect(screen.getByLabelText(/Quantidade de parcelas/i)).toBeInTheDocument();
  });
});