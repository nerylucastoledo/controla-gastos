import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Register from '../../register/page';

// Mock do useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => jest.fn(),
}));

jest.mock('../../../../.env', () => ({
  __esModule: true,
  ...jest.requireActual('../../../../.env')
}));

describe('Register page', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders texts and images', () => {
    render(<Register />);

    const textTop = screen.getByText("Ao se cadastrar você vai conseguir ter maior controle dos seus gastos, visualizar onde você mais está gastando e quanto cada pessoa deve te passar no final do mês, caso você empreste seu cartão.")
    const textTopForm = screen.getByText("Criar uma conta")
    const textTopForm2 = screen.getByText("Coloque seus dados")
    const textBottom = screen.getByText("Já possui conta?")

    expect(textTop).toBeInTheDocument();
    expect(textBottom).toBeInTheDocument();
    expect(textTopForm).toBeInTheDocument();
    expect(textTopForm2).toBeInTheDocument();
  });

  it('renders register form correctly', () => {
    render(<Register />);

    const emailLabel = screen.getByTestId("email-label");
    const emailInput = screen.getByRole('textbox', { name: "Email" })
    const nameLabel = screen.getByTestId("name-label");
    const nameInput = screen.getByRole('textbox', { name: "Nome" })
    const salaryLabel = screen.getByTestId("salary-label");
    const salaryInput = screen.getByRole('textbox', { name: "Salário" })
    const passwordLabel = screen.getByTestId("password-label");
    const passwordInput = screen.getByRole('password', { name: "Senha" })
    const submitForm = screen.getByRole('button', { name: "Cadastrar" })
    const btnLogin = screen.getByRole('link', { href: "/login" })

    expect(emailLabel).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(nameLabel).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(salaryLabel).toBeInTheDocument();
    expect(salaryInput).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitForm).toBeInTheDocument();
    expect(btnLogin).toBeInTheDocument();
  });

  it('updates email, name, salary and password fields', () => {
    render(<Register />);

    const emailInput = screen.getByRole('textbox', { name: "Email" })
    const nameInput = screen.getByRole('textbox', { name: "Nome" })
    const salaryInput = screen.getByRole('textbox', { name: "Salário" })
    const passwordInput = screen.getByRole('password', { name: "Senha" })

    expect(emailInput.value).toEqual("")
    expect(nameInput.value).toEqual("")
    expect(salaryInput.value).toEqual("")
    expect(passwordInput.value).toEqual("")

    fireEvent.change(emailInput, { target: { value: "teste@teste.com" }});
    fireEvent.change(nameInput, { target: { value: "Testname" }});
    fireEvent.change(salaryInput, { target: { value: "R$ 1.000,00" }});
    fireEvent.change(passwordInput, { target: { value: "pass123" }});

    expect(emailInput.value).toEqual("teste@teste.com")
    expect(nameInput.value).toEqual("Testname")
    expect(salaryInput.value).toEqual("R$ 1.000,00")
    expect(passwordInput.value).toEqual("pass123")
  });

  it('submits the form successfully', async () => {
    // Mock da API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Register successful' }),
      })
    );
    
    const router = { replace: jest.fn() };
    jest.spyOn(require('next/navigation'), 'useRouter').mockImplementation(() => router);

    render(<Register />);

    const emailInput = screen.getByRole('textbox', { name: "Email" })
    const nameInput = screen.getByRole('textbox', { name: "Nome" })
    const salaryInput = screen.getByRole('textbox', { name: "Salário" })
    const passwordInput = screen.getByRole('password', { name: "Senha" })
    const submitForm = screen.getByRole('button', { name: "Cadastrar" })

    fireEvent.change(emailInput, { target: { value: "teste@teste.com" }});
    fireEvent.change(nameInput, { target: { value: "Testname" }});
    fireEvent.change(salaryInput, { target: { value: "R$ 1.000,00" }});
    fireEvent.change(passwordInput, { target: { value: "pass123" }});
    fireEvent.click(submitForm);

    await waitFor(() => {
      expect(router.replace).toHaveBeenCalledWith("/login");
      expect(screen.getByText('Register successful')).toBeInTheDocument();
    })
  });

  it('handles API failure', async () => {
    // Mock da API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Register failed' }),
      })
    );
    
    render(<Register />);

    const emailInput = screen.getByRole('textbox', { name: "Email" })
    const nameInput = screen.getByRole('textbox', { name: "Nome" })
    const salaryInput = screen.getByRole('textbox', { name: "Salário" })
    const passwordInput = screen.getByRole('password', { name: "Senha" })
    const submitForm = screen.getByRole('button', { name: "Cadastrar" })

    fireEvent.change(emailInput, { target: { value: "teste@teste.com" }});
    fireEvent.change(nameInput, { target: { value: "Testname" }});
    fireEvent.change(salaryInput, { target: { value: "R$ 1.000,00" }});
    fireEvent.change(passwordInput, { target: { value: "pass123" }});
    fireEvent.click(submitForm);

    await waitFor(() => {
      expect(screen.getByText('Register failed')).toBeInTheDocument();
    });
  });

  it('displays toast message correctly', async () => {
    // Mock da API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Register failed' }),
      })
    );
    
    render(<Register />);

    const emailInput = screen.getByRole('textbox', { name: "Email" })
    const nameInput = screen.getByRole('textbox', { name: "Nome" })
    const salaryInput = screen.getByRole('textbox', { name: "Salário" })
    const passwordInput = screen.getByRole('password', { name: "Senha" })
    const submitForm = screen.getByRole('button', { name: "Cadastrar" })

    fireEvent.change(emailInput, { target: { value: "teste@teste.com" }});
    fireEvent.change(nameInput, { target: { value: "Testname" }});
    fireEvent.change(salaryInput, { target: { value: "R$ 1.000,00" }});
    fireEvent.change(passwordInput, { target: { value: "pass123" }});
    fireEvent.click(submitForm);

    await waitFor(() => {
      expect(screen.getByText('Register failed')).toBeInTheDocument();
    });

    // Verifica se o toast desaparece após 3 segundos
    await waitFor(() => {
      expect(screen.queryByText('Register failed')).not.toBeInTheDocument();
    }, { timeout: 4000 });
  });
});