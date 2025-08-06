import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Account from '../account';
import { salaryUpdate } from '../../../actions/account';
import toast from 'react-hot-toast';

jest.mock('../../../actions/account');

jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
  success: jest.fn(),
}));

describe('Account', () => {
  const peoples = [{ _id: '1', name: 'Test Person' }];
  const cards = [{ _id: '1', name: 'Test Card', color: '#ffffff' }];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with no people and no cards', () => {
    render(
      <Account peoples={[]} cards={[]} />
    );

    expect(screen.getByText(/Você não possui pessoas cadastradas./)).toBeInTheDocument();
    expect(screen.getByText(/Você não possui cartões cadastrados./)).toBeInTheDocument();
  });

  it('renders peoples and cards correctly', () => {
    render(
      <Account peoples={peoples} cards={cards} />
    );

    expect(screen.getByText('Pessoas')).toBeInTheDocument();
    expect(screen.getByText('Test Person')).toBeInTheDocument();
    expect(screen.getByText('Cartões')).toBeInTheDocument();
    expect(screen.getByText('Test Card')).toBeInTheDocument();
  });

  it('updates salary and shows success toast', async () => {
    salaryUpdate.mockResolvedValue({ ok: true, data: { message: 'Salário atualizado com sucesso!' } });

    render(
      <Account peoples={peoples} cards={cards} />
    );

    fireEvent.change(screen.getByLabelText('Salário'), { target: { value: 'R$ 1.500,00' } });
    fireEvent.click(screen.getByRole('button', { name: /salvar/i }));

    await waitFor(() => {
      expect(salaryUpdate).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("Salário atualizado com sucesso!");
    });
  });

  it('shows error toast on salary update failure', async () => {
    salaryUpdate.mockResolvedValue({ ok: false, error: 'Erro ao atualizar. Tente novamente!' });

    render(
      <Account peoples={peoples} cards={cards} />
    );

    fireEvent.change(screen.getByLabelText('Salário'), { target: { value: 'R$ 1.500,00' } });
    fireEvent.click(screen.getByRole('button', { name: /salvar/i }));

    await waitFor(() => {
      expect(salaryUpdate).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith("Erro ao atualizar. Tente novamente!");
    });
  });

  it('opens the edit modal for a card item', () => {
    render(
      <Account peoples={peoples} cards={cards} />
    );

    fireEvent.click(screen.getAllByTestId('edit-button')[0]);
    expect(screen.getByText('Editar')).toBeInTheDocument();
  });

  it('should open the edit modal and close', async () => {
    render(
      <Account peoples={peoples} cards={cards} />
    );

    fireEvent.click(screen.getAllByTestId('edit-button')[0]);
    expect(screen.queryByText('Faça as alterações necessárias')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('close-button'));

    expect(screen.queryByText('Faça as alterações necessárias')).not.toBeInTheDocument();
  });

  it('opens the delete modal for a person', () => {
    render(
      <Account peoples={peoples} cards={cards} />
    );

    fireEvent.click(screen.getAllByTestId('delete-button')[0]);
    expect(screen.getByText('Deletar item')).toBeInTheDocument();
  });
});