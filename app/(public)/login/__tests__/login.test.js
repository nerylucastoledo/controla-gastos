import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Login from '../page';
import { Providers } from '../../../providers';
import { useRouter } from 'next/navigation';

// Mock do useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(), // Mantém o mock
}));

// Mock da variável de ambiente
jest.mock('../../../../.env', () => ({
  __esModule: true,
  ...jest.requireActual('../../../../.env'),
}));

describe('Login page', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders texts and images', () => {
    render(<Providers><Login /></Providers>);

    const textTop = screen.getByText("Entre e visualize como foi seus gastos nos meses anteriores, como está no mês atual e como ficará nos próximos meses.");
    const textTopForm = screen.getByText("Acessar sua conta");
    const textTopForm2 = screen.getByText("Insira sua conta");
    const textBottom = screen.getByText("Não possui conta?");

    expect(textTop).toBeInTheDocument();
    expect(textBottom).toBeInTheDocument();
    expect(textTopForm).toBeInTheDocument();
    expect(textTopForm2).toBeInTheDocument();
  });

  it('renders login form correctly', () => {
    render(<Providers><Login /></Providers>);

    const emailLabel = screen.getByTestId("email-label");
    const emailInput = screen.getByTestId("email");
    const passwordLabel = screen.getByTestId("password-label");
    const passwordInput = screen.getByTestId("password");
    const submitForm = screen.getByRole('button', { name: "Acessar" });
    const btnCreateNewAccount = screen.getByRole('link', { href: "/register" });

    expect(emailLabel).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitForm).toBeInTheDocument();
    expect(btnCreateNewAccount).toBeInTheDocument();
  });

  it('updates email and password fields', () => {
    render(<Providers><Login /></Providers>);

    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");

    expect(emailInput.value).toEqual("");
    expect(passwordInput.value).toEqual("");

    fireEvent.change(emailInput, { target: { value: "teste@teste.com" }});
    fireEvent.change(passwordInput, { target: { value: "pass123" }});

    expect(emailInput.value).toEqual("teste@teste.com");
    expect(passwordInput.value).toEqual("pass123");
  });

  it('submits the form successfully', async () => {
    // Mock da API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ username: 'testuser', salary: 'R$ 1.000,00', message: 'Login successful' }),
      })
    );
    
    const mockRouter = { push: jest.fn() };
    useRouter.mockImplementation(() => mockRouter);

    render(<Providers><Login /></Providers>);

    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const submitForm = screen.getByRole('button', { name: "Acessar" });

    fireEvent.change(emailInput, { target: { value: "teste@teste.com" }});
    fireEvent.change(passwordInput, { target: { value: "pass123" }});
    fireEvent.click(submitForm);

    await waitFor(() => {
      expect(localStorage.getItem("username")).toBe('testuser');
      expect(localStorage.getItem("salary")).toBe('R$ 1.000,00');
      expect(mockRouter.push).toHaveBeenCalledWith("/");
      expect(screen.getByText('Login successful')).toBeInTheDocument();
    });
  });

  it('handles API failure', async () => {
    // Mock da API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Login failed' }),
      })
    );

    render(<Providers><Login /></Providers>);

    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const submitForm = screen.getByRole('button', { name: "Acessar" });

    fireEvent.change(emailInput, { target: { value: "teste@teste.com" }});
    fireEvent.change(passwordInput, { target: { value: "pass123" }});
    fireEvent.click(submitForm);

    await waitFor(() => {
      expect(screen.getByText('Login failed')).toBeInTheDocument();
    });
  });

  it('displays toast message correctly', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ username: 'testuser', salary: 'R$ 1.000,00', message: 'Login successful' }),
      })
    );

    render(<Providers><Login /></Providers>);
    
    fireEvent.change(screen.getByRole('textbox', { name: "Email" }), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: "Acessar" }));

    await waitFor(() => {
      expect(screen.getByText('Login successful')).toBeInTheDocument();
    });
  });
});