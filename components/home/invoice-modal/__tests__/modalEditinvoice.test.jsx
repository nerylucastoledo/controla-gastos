import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ModalEditInvoice from '../modalEditInvoice';
import { useDate } from '../../../../context/date-context';
import { billEdit } from '../../../../actions/bill';
import toast from 'react-hot-toast';

jest.mock('../../../../context/date-context', () => ({
  useDate: jest.fn(),
}));

jest.mock('../../../../actions/bill', () => ({
  billEdit: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
  success: jest.fn(),
}));

jest.mock('../../../../actions/bill', () => ({
  billEdit: jest.fn(),
}));

const mockInvoice = {
  _id: '1',
  item: 'Groceries',
  value: 'R$ 150',
  category: 'Alimentação',
};

const mockHandleCloseModal = jest.fn();

describe('ModalEditInvoice Component', () => {
  beforeEach(() => {
    useDate.mockReturnValue({
      date: { month: '01', year: '2023' }
    });
    jest.clearAllMocks();
  });

  it('renders modal with correct title and subtitle', () => {
    render(<ModalEditInvoice handleCloseModal={mockHandleCloseModal} invoice={mockInvoice} />);

    expect(screen.getByText(/editar item/i)).toBeInTheDocument();
    expect(screen.getByText(/faça as alterações no item selecionado/i)).toBeInTheDocument();
  });

  it('should update invoice and close modal on Save button click', async () => {
    billEdit.mockResolvedValue({ ok: true });

    render(<ModalEditInvoice handleCloseModal={mockHandleCloseModal} invoice={mockInvoice} />);

    fireEvent.change(screen.getByLabelText(/item/i), { target: { value: 'Updated Groceries' } });
    fireEvent.change(screen.getByLabelText(/valor/i), { target: { value: '200' } });
    fireEvent.change(screen.getByLabelText(/categoria/i), { target: { value: 'Alimentação' } });

    fireEvent.click(screen.getByText(/salvar/i));

    await waitFor(() => {
      expect(mockHandleCloseModal).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("Despesa atualizada com sucesso!");
    });
  });

  it('shows error message when edit fails', async () => {
    billEdit.mockResolvedValue({ ok: false, data: {} });

    render(<ModalEditInvoice handleCloseModal={mockHandleCloseModal} invoice={mockInvoice} />);

    fireEvent.click(screen.getByText(/salvar/i));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Erro ao editar a despesa. Tente novamente!");
      expect(mockHandleCloseModal).not.toHaveBeenCalled();
    });
  });

  it('calls handleCloseModal when Cancel button is clicked', () => {
    render(<ModalEditInvoice handleCloseModal={mockHandleCloseModal} invoice={mockInvoice} />);

    fireEvent.click(screen.getByText(/cancelar/i));

    expect(mockHandleCloseModal).toHaveBeenCalled();
  });
});