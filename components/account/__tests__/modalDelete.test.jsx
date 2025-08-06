import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ModalDelete from '../modal-action/modalDelete';
import { deletePeopleOrCard } from '../../../actions/account';
import toast from 'react-hot-toast';

jest.mock('../../../actions/account');

jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
  success: jest.fn(),
}));

describe('ModalDelete', () => {
  const mockHandleCloseModal = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should close modal', async () => {
    const item = { _id: '1', name: 'Test Card', color: 'blue' };
    render(<ModalDelete handleCloseModal={mockHandleCloseModal} item={item} />);

    fireEvent.click(screen.getByTestId('close-button'));

    expect(mockHandleCloseModal).toHaveBeenCalled();
  });

  it('renders correctly with CardDTOOutput', () => {
    const item = { _id: '1', name: 'Test Card', color: '#ffffff' };
    render(<ModalDelete handleCloseModal={mockHandleCloseModal} item={item} />);
    
    expect(screen.getByText('Deletar item')).toBeInTheDocument();
    expect(screen.getByText(/Tem certeza que deseja apagar Test Card?/)).toBeInTheDocument();
  });

  it('renders correctly with PeopleDTOOutput', () => {
    const item = { _id: '2', name: 'Test Person' };
    render(<ModalDelete handleCloseModal={mockHandleCloseModal} item={item} />);
    
    expect(screen.getByText('Deletar item')).toBeInTheDocument();
    expect(screen.getByText(/Tem certeza que deseja apagar Test Person?/)).toBeInTheDocument();
  });

  it('calls handleCloseModal when Cancel button is clicked', () => {
    const item = { _id: '1', name: 'Test Card', color: 'blue' };
    render(<ModalDelete handleCloseModal={mockHandleCloseModal} item={item} />);
    
    fireEvent.click(screen.getByText('Cancelar'));
    expect(mockHandleCloseModal).toHaveBeenCalled();
  });

  it('successfully deletes the item and shows a success toast', async () => {
    const item = { _id: '1', name: 'Test Card', color: 'blue' };
    deletePeopleOrCard.mockResolvedValue({ ok: true });

    render(<ModalDelete handleCloseModal={mockHandleCloseModal} item={item} />);

    fireEvent.click(screen.getByTestId('delete-button'));

    await waitFor(() => {
      expect(deletePeopleOrCard).toHaveBeenCalledWith('/cards/1');
      expect(toast.success).toHaveBeenCalledWith("A remoção foi feita com sucesso!");
      expect(mockHandleCloseModal).toHaveBeenCalled();
    });
  });

  it('shows an error toast on deletion failure', async () => {
    const item = { _id: '1', name: 'Test Card', color: 'blue' };
    deletePeopleOrCard.mockResolvedValue({ ok: false, data: 'error' });

    render(<ModalDelete handleCloseModal={mockHandleCloseModal} item={item} />);
    
    fireEvent.click(screen.getByText('Apagar'));

    await waitFor(() => {
      expect(deletePeopleOrCard).toHaveBeenCalledWith('/cards/1');
      expect(toast.error).toHaveBeenCalledWith("Erro ao deletar. Tente novamente!");
      expect(mockHandleCloseModal).not.toHaveBeenCalled();
    });
  });

  it('disables the delete button while loading', async () => {
    const item = { _id: '1', name: 'Test Card', color: 'blue' };
    deletePeopleOrCard.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ ok: true }), 1000)));

    render(<ModalDelete handleCloseModal={mockHandleCloseModal} item={item} />);

    fireEvent.click(screen.getByTestId('delete-button'));

    expect(screen.getByText('Apagando...')).toBeInTheDocument();
    expect(screen.queryByText('Apagar')).not.toBeInTheDocument();
  });
});