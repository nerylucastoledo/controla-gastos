import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Config from "../page";
import useSWR from 'swr';
import { useUser } from '../../context/user';

jest.mock('swr');
jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
}));
jest.mock('next/navigation', () => ({
  useRouter: () => jest.fn(),
}));

const setSalary = jest.fn();
jest.mock('../../context/user', () => ({
  useUser: jest.fn(() => ({
    username: "",
    salary: "",
    setSalary: setSalary,
  })),
}));

describe('Config page', () => {
  const mockSalary = "R$ 1.000,00"; // Mock salary
  const mockData = [
    {
      _id: "1",
      username: "teste username 1",
      name: "Test name 1",
      color: "Red",
    },
    {
      _id: "2",
      username: "teste username 2",
      name: "Test name 2",
      color: "Blue",
    },
  ];

  beforeEach(() => {
    (useUser).mockReturnValue({ salary: mockSalary });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('shows error message on data fetch failure', async () => {
    // Mock SWR to simulate error state
    useSWR.mockReturnValue({
      data: undefined,
      error: { message: 'Fetch error' },
      isLoading: false,
      mutate: jest.fn(),
    });

    render(<Config />);
    expect(await screen.findByText(/tivemos um problema para carregar seus dados/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /recarregar/i })).toBeInTheDocument();
  });

  test('shows empty message when data is empty', async () => {
    // Mock SWR to simulate error state
    useSWR.mockReturnValue({
      data: { data: [] },
      error: false,
      isLoading: false,
      mutate: jest.fn(),
    });

    render(<Config />);
    expect(screen.getByText(/Atualize os dados/i)).toBeInTheDocument();
    expect(screen.getByText(/Aqui você mantém total controle das pessoas, cartões e dos eu salário/i)).toBeInTheDocument();
    expect(await screen.findByText(/nenhuma pessoa cadastrada/i)).toBeInTheDocument();
    expect(await screen.findByText(/nenhum cartão cadastrado/i)).toBeInTheDocument();
  });
  

  test('should render salary in input', async () => {
    // Mock SWR to simulate error state
    useSWR.mockReturnValue({
      data: { data: mockData },
      error: false,
      isLoading: false,
      mutate: jest.fn(),
    });

    render(<Config />);

    const salaryInput = screen.getByTestId("value")
    expect(salaryInput.value).toEqual(mockSalary);
  });

  test('should render 2 people and 2 card on screen', async () => {
    // Mock SWR to simulate error state
    useSWR.mockReturnValue({
      data: { data: mockData },
      error: false,
      isLoading: false,
      mutate: jest.fn(),
    });

    render(<Config />);

    expect(screen.getAllByText("Test name 1")).toHaveLength(2);
    expect(screen.getAllByText("Test name 2")).toHaveLength(2);
  });

  it('should update the salary', async () => {
    const mutateMock = jest.fn();
    useSWR.mockReturnValue({
      data: { data: mockData },
      error: false,
      isLoading: false,
      mutate: mutateMock,
    });
    
    // Mock da API
    const message = 'Salário atualizado com sucesso.';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message }),
      })
    );
  
    render(<Config />);
  
    // Simular a alteração do salário
    const salary = screen.getByTestId("value");
    fireEvent.change(salary, { target: { value: 'R$ 3.999,99' } });
    fireEvent.click(screen.getByTestId("update-salary"));
  
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  it('should show message error when failed the update salary', async () => {
    const mutateMock = jest.fn();
    useSWR.mockReturnValue({
      data: { data: mockData },
      error: false,
      isLoading: false,
      mutate: mutateMock,
    });
    
    // Mock da API
    const message = 'Error ao atualizar o salário.';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message }),
      })
    );
  
    render(<Config />);
  
    // Simular a alteração do salário
    const salary = screen.getByTestId("value");
    fireEvent.change(salary, { target: { value: 'R$ 3.999,99' } });
    fireEvent.click(screen.getByTestId("update-salary"));
  
    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument();
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  it('should update the first name', async () => {
    const mutateMock = jest.fn();
    useSWR.mockReturnValue({
      data: { data: mockData },
      error: false,
      isLoading: false,
      mutate: mutateMock,
    });
    
    // Mock da API
    const message = 'Gasto atualizado com sucesso.';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message }),
      })
    );
  
    const router = { replace: jest.fn() };
    jest.spyOn(require('next/navigation'), 'useRouter').mockImplementation(() => router);
  
    render(<Config />);
  
    // Abrir o modal de edição para a primeira pessoa
    fireEvent.click(screen.getAllByTestId('edit-button')[0]);
  
    // Verificar se o modal está sendo exibido
    expect(screen.getByTestId("title-edit")).toBeInTheDocument();
    expect(screen.getByTestId("subtitle-edit")).toBeInTheDocument();
  
    // Simular a alteração do nome
    const input = screen.getByTestId("item");
    fireEvent.change(input, { target: { value: 'Novo Nome' } });
    fireEvent.click(screen.getByTestId("submit-edit"));
  
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(mutateMock).toHaveBeenCalled();
    });
  });

  it('should delete the first name', async () => {
    const mutateMock = jest.fn();
    useSWR.mockReturnValue({
      data: { data: mockData },
      error: false,
      isLoading: false,
      mutate: mutateMock,
    });
    
    // Mock da API
    const message = 'Gasto deletado com sucesso.';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message }),
      })
    );
  
    const router = { replace: jest.fn() };
    jest.spyOn(require('next/navigation'), 'useRouter').mockImplementation(() => router);
  
    render(<Config />);
  
    // Abrir o modal de deletar para a primeira pessoa
    fireEvent.click(screen.getAllByTestId('delete-button')[0]);
  
    // Verificar se o modal está sendo exibido
    expect(screen.getByTestId("title-delete")).toBeInTheDocument();
    expect(screen.getByTestId("subtitle-delete")).toBeInTheDocument();
  
    // Simular o click no botão
    fireEvent.click(screen.getByTestId("submit-delete"));
  
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(mutateMock).toHaveBeenCalled();
    });
  });

  // test('submits the form with valid data', async () => {
  //   const mutateMock = jest.fn();
  //   useSWR.mockReturnValue({ data: { data: [{ _id: '1', name: 'Teste', username: 'john_doe' }] }, error: null, isLoading: false, mutate: mutateMock });
  
  //   // Mock da API para simular um erro
  //   const message = 'Ocorreu um erro interno! Tente novamente';
  //   global.fetch = jest.fn(() =>
  //     Promise.resolve({
  //       ok: true,
  //       json: () => Promise.resolve({ message }),
  //     })
  //   );
  

  //   render(<Providers><NewExpense /></Providers>);

  //   // Fill out the form
  //   fireEvent.change(screen.getByTestId('month-select'), { target: { value: "Janeiro" } });
  //   fireEvent.change(screen.getByTestId('year-select'), { target: { value: "2025" } });
  //   fireEvent.change(screen.getByTestId('people-select'), { target: { value: "Eu" } });
  //   fireEvent.change(screen.getByTestId('card-select'), { target: { value: "Teste" } });
  //   fireEvent.change(screen.getByTestId('category-select'), { target: { value: "Teste" } });
  //   fireEvent.change(screen.getByTestId('item'), { target: { value: "R$ 20,00" } });
  //   fireEvent.change(screen.getByTestId('value'), { target: { value: "Pizza" } });

  //   // Submit the form
  //   fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

  //   await waitFor(() => {
  //     expect(screen.getByText(message)).toBeInTheDocument();
  //   });
  // });

  // it('submits the form with invalid data', async () => {
  //   const mutateMock = jest.fn();
  //   useSWR.mockReturnValue({ data: { data: [{ _id: '1', name: 'Teste', username: 'john_doe' }]}, error: null, isLoading: false, mutate: mutateMock });
  
  //   // Mock da API para simular um erro
  //   const message = 'Ocorreu um erro interno! Tente novamente';
  //   global.fetch = jest.fn(() =>
  //     Promise.resolve({
  //       ok: false,
  //       json: () => Promise.resolve({ message }),
  //     })
  //   );
  
  //   render(<Providers><NewExpense /></Providers>);
  
  //   // Fill out the form
  //   fireEvent.change(screen.getByTestId('month-select'), { target: { value: "Janeiro" } });
  //   fireEvent.change(screen.getByTestId('year-select'), { target: { value: "2025" } });
  //   fireEvent.change(screen.getByTestId('people-select'), { target: { value: "Eu" } });
  //   fireEvent.change(screen.getByTestId('card-select'), { target: { value: "Teste" } });
  //   fireEvent.change(screen.getByTestId('category-select'), { target: { value: "Teste" } });
  //   fireEvent.change(screen.getByTestId('item'), { target: { value: "R$ 20,00" } });
  //   fireEvent.change(screen.getByTestId('value'), { target: { value: "Pizza" } });

  //   // Submit the form
  //   fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

  //   await waitFor(() => {
  //     expect(screen.getByText(message)).toBeInTheDocument();
  //   });
  
  //   expect(mutateMock).not.toHaveBeenCalled();
  // });

  // it('show message to add card', async () => {
  //   const mutateMock = jest.fn();
  //   useSWR.mockReturnValue({ data: { data: [] }, error: null, isLoading: false, mutate: mutateMock });
  
  //   // Mock da API para simular um erro
  //   const message = 'Ocorreu um erro interno! Tente novamente';
  //   global.fetch = jest.fn(() =>
  //     Promise.resolve({
  //       ok: false,
  //       json: () => Promise.resolve({ message }),
  //     })
  //   );
  
  //   render(<Providers><NewExpense /></Providers>);
  
  //   expect(screen.getByText(/Você precisa cadastrar um cartão para continuar/i)).toBeInTheDocument();
  // });
});