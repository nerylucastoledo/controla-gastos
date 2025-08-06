import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ModalEdit from '../modal-action/modalEdit';
import { editPeopleOrCard } from '../../../actions/account';
import toast from 'react-hot-toast';

jest.mock('../../../actions/account');

jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
  success: jest.fn(),
}));

describe('ModalEdit', () => {
  const mockHandleCloseModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should close modal', async () => {
    const item = { _id: '1', name: 'Test Card', color: 'blue' };
    render(<ModalEdit handleCloseModal={mockHandleCloseModal} item={item} />);

    fireEvent.click(screen.getByTestId('close-button'));

    expect(mockHandleCloseModal).toHaveBeenCalled();
  });

  it('renders correctly with CardDTOOutput', () => {
    const item = { _id: '1', name: 'Test Card', color: '#ffffff' };
    render(<ModalEdit handleCloseModal={mockHandleCloseModal} item={item} />);
    
    expect(screen.getByLabelText('Nome')).toHaveValue('Test Card');
    expect(screen.getByLabelText('Cor do cartão')).toHaveValue('#ffffff');
  });

  it('renders correctly with PeopleDTOOutput', () => {
    const item = { _id: '2', name: 'Test Person' };
    render(<ModalEdit handleCloseModal={mockHandleCloseModal} item={item} />);
    
    expect(screen.getByLabelText('Nome')).toHaveValue('Test Person');
    expect(screen.queryByLabelText('Cor do cartão')).toBeNull();
  });

  it('calls handleCloseModal when the Cancel button is clicked', () => {
    const item = { _id: '1', name: 'Test Card', color: 'blue' };
    render(<ModalEdit handleCloseModal={mockHandleCloseModal} item={item} />);
    
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(mockHandleCloseModal).toHaveBeenCalled();
  });

  it('submits the form and shows a success toast', async () => {
    const item = { _id: '1', name: 'Test Card', color: 'blue' };
    editPeopleOrCard.mockResolvedValue({ ok: true, data: null });

    render(<ModalEdit handleCloseModal={mockHandleCloseModal} item={item} />);
    
    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Updated Card' } });
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));

    await waitFor(() => {
      expect(editPeopleOrCard).toHaveBeenCalled();
      expect(mockHandleCloseModal).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalled();
    });
  });

  it('shows an error toast on submission failure', async () => {
    const item = { _id: '1', name: 'Test Card', color: 'blue' };
    editPeopleOrCard.mockResolvedValue({ ok: false, data: 'error' });

    render(<ModalEdit handleCloseModal={mockHandleCloseModal} item={item} />);
    
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));

    await waitFor(() => {
      expect(editPeopleOrCard).toHaveBeenCalled();
      expect(mockHandleCloseModal).not.toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith("Erro ao editar. Tente novamente!");
    });
  });
});