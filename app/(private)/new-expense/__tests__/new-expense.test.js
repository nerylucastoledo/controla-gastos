import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Providers } from '../../../providers';
import NewExpense from "../page";
import useSWR from 'swr';

// Mock SWR globally
jest.mock('swr');
jest.mock('../../../utils', () => ({
  ...jest.requireActual('../../../utils'),
  categorys: ['Teste'],
}));

describe('NewExpense page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    // Mock SWR to simulate successful data fetching
    useSWR.mockReturnValue({
      data: { data: [{ _id: '1', name: 'John', username: 'john_doe' }] },
      error: null,
      isLoading: false,
      mutate: jest.fn(),
    });

    render(<Providers><NewExpense /></Providers>);
    expect(screen.getByText(/cadastre o novo gasto/i)).toBeInTheDocument();
  });

  test('shows error message on data fetch failure', async () => {
    // Mock SWR to simulate error state
    useSWR.mockReturnValue({
      data: { data: null },
      error: { message: 'Fetch error' },
      isLoading: false,
      mutate: jest.fn(),
    });

    render(<Providers><NewExpense /></Providers>);
    expect(await screen.findByText(/tivemos um problema para carregar seus dados/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /recarregar/i })).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    const mutateMock = jest.fn();
    useSWR.mockReturnValue({ data: { data: [{ _id: '1', name: 'Teste', username: 'john_doe' }] }, error: null, isLoading: false, mutate: mutateMock });
  
    // Mock da API para simular um erro
    const message = 'Ocorreu um erro interno! Tente novamente';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message }),
      })
    );
  

    render(<Providers><NewExpense /></Providers>);

    // Fill out the form
    fireEvent.change(screen.getByTestId('month-select'), { target: { value: "Janeiro" } });
    fireEvent.change(screen.getByTestId('year-select'), { target: { value: "2025" } });
    fireEvent.change(screen.getByTestId('people-select'), { target: { value: "Eu" } });
    fireEvent.change(screen.getByTestId('card-select'), { target: { value: "Teste" } });
    fireEvent.change(screen.getByTestId('category-select'), { target: { value: "Teste" } });
    fireEvent.change(screen.getByTestId('item'), { target: { value: "R$ 20,00" } });
    fireEvent.change(screen.getByTestId('value'), { target: { value: "Pizza" } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument();
    });
  });

  it('submits the form with invalid data', async () => {
    const mutateMock = jest.fn();
    useSWR.mockReturnValue({ data: { data: [{ _id: '1', name: 'Teste', username: 'john_doe' }]}, error: null, isLoading: false, mutate: mutateMock });
  
    // Mock da API para simular um erro
    const message = 'Ocorreu um erro interno! Tente novamente';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message }),
      })
    );
  
    render(<Providers><NewExpense /></Providers>);
  
    // Fill out the form
    fireEvent.change(screen.getByTestId('month-select'), { target: { value: "Janeiro" } });
    fireEvent.change(screen.getByTestId('year-select'), { target: { value: "2025" } });
    fireEvent.change(screen.getByTestId('people-select'), { target: { value: "Eu" } });
    fireEvent.change(screen.getByTestId('card-select'), { target: { value: "Teste" } });
    fireEvent.change(screen.getByTestId('category-select'), { target: { value: "Teste" } });
    fireEvent.change(screen.getByTestId('item'), { target: { value: "R$ 20,00" } });
    fireEvent.change(screen.getByTestId('value'), { target: { value: "Pizza" } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument();
    });
  
    expect(mutateMock).not.toHaveBeenCalled();
  });

  it('show message to add card', async () => {
    const mutateMock = jest.fn();
    useSWR.mockReturnValue({ data: { data: [] }, error: null, isLoading: false, mutate: mutateMock });
  
    // Mock da API para simular um erro
    const message = 'Ocorreu um erro interno! Tente novamente';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message }),
      })
    );
  
    render(<Providers><NewExpense /></Providers>);
  
    expect(screen.getByText(/Você precisa cadastrar um cartão para continuar/i)).toBeInTheDocument();
  });
});