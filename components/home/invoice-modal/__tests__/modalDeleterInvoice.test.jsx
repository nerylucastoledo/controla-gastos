import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ModalDeleteInvoice from '../modalDeleteInvoice';
import { useDate } from '../../../../context/date-context';
import { billDelete } from '../../../../actions/bill';
import toast from 'react-hot-toast';

jest.mock('../../../../context/date-context', () => ({
  useDate: jest.fn(),
}));

jest.mock('../../../../actions/bill', () => ({
  billDelete: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
  success: jest.fn(),
}));

const mockInvoice = {
  _id: '1',
  item: 'Groceries',
  value: 'R$ 150',
  category: 'Alimentação',
};

const mockHandleCloseModal = jest.fn();

describe('ModalDeleteInvoice Component', () => {
  beforeEach(() => {
    useDate.mockReturnValue({
      date: { month: 'January', year: '2023' },
    });
    jest.clearAllMocks();
  });

  it('renders modal with correct title and subtitle', () => {
    render(<ModalDeleteInvoice handleCloseModal={mockHandleCloseModal} invoice={mockInvoice} />);

    expect(screen.getByText(/deletar item/i)).toBeInTheDocument();
    expect(screen.getByText(/tem certeza que deseja apagar groceries\?/i)).toBeInTheDocument();
  });

  it('shows error toast and does not close modal when delete fails', async () => {
    billDelete.mockResolvedValue({ ok: false, data: {} });

    render(<ModalDeleteInvoice handleCloseModal={mockHandleCloseModal} invoice={mockInvoice} />);

    fireEvent.click(screen.getByTestId('delete-button'));

    await waitFor(() => {
      expect(billDelete).toHaveBeenCalledWith('/expenses/1');
      expect(mockHandleCloseModal).not.toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith("Erro ao deletar despesa. Tente novamente!");
    });
  });

  it('calls billDelete when Apagar button is clicked and shows success toast', async () => {
    billDelete.mockResolvedValue({ ok: true });

    render(<ModalDeleteInvoice handleCloseModal={mockHandleCloseModal} invoice={mockInvoice} />);

    fireEvent.click(screen.getByTestId('delete-button'));

    await waitFor(() => {
      expect(billDelete).toHaveBeenCalledWith('/expenses/1');
      expect(mockHandleCloseModal).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("Despesa deletada com sucesso!");
    });
  });

  it('calls handleCloseModal when Cancel button is clicked', () => {
    render(<ModalDeleteInvoice handleCloseModal={mockHandleCloseModal} invoice={mockInvoice} />);

    fireEvent.click(screen.getByText(/cancelar/i));

    expect(mockHandleCloseModal).toHaveBeenCalled();
  });
});