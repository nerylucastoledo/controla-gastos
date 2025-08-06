import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateAccountForm from '../create-account-form';
import register from '../../../actions/register';
import { redirect } from 'next/navigation';

jest.mock('../../../actions/register');

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('CreateAccountForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders the registration form', () => {
    render(
      <CreateAccountForm />
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/salário/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/Criar conta/i)).toBeInTheDocument();
  });

  it('validates input fields', async () => {
    render(
      <CreateAccountForm />
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalidEmail' } });
    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/salário/i), { target: { value: 'notASalary' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '' } });

    fireEvent.click(screen.getByRole('button', { name: /Criar conta/i }));

    await waitFor(() => {
      expect(register).not.toHaveBeenCalled();
    });
  });

  it('submits the form and redirects on successful registration', async () => {
    register.mockResolvedValue({ ok: true, data: { salary: 2000 } });

    render(
      <CreateAccountForm />
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/salário/i), { target: { value: 'R$ 2500,00' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });

    fireEvent.click(screen.getByRole('button', { name: /Criar conta/i }));

    await waitFor(() => {
      expect(register).toHaveBeenCalled();
      expect(localStorage.getItem('salary')).toBe('2000');
      expect(redirect).toHaveBeenCalledWith('/');
    });
  });

  it('shows error message on failed registration', async () => {
    register.mockResolvedValue({ ok: false, error: 'Error creating account' });

    render(
      <CreateAccountForm />
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/salário/i), { target: { value: 'R$ 2500,00' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });

    fireEvent.click(screen.getByRole('button', { name: /Criar conta/i }));

    await waitFor(() => {
      expect(register).toHaveBeenCalled();
      expect(screen.getByText(/Error creating account/i)).toBeInTheDocument();
    });
  });
});