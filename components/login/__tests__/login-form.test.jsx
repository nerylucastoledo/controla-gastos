import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../login-form';
import login from '../../../actions/login';
import { redirect } from 'next/navigation';

jest.mock('../../../actions/login');

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('LoginForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders the login form', () => {
    render(
      <LoginForm />
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/perdeu a senha\?/i)).toBeInTheDocument();
  });

  it('validates email and password input', async () => {
    render(
      <LoginForm />
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalidEmail' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(login).not.toHaveBeenCalled();
    });
  });

  it('submits the form and redirect on successful login', async () => {
    login.mockResolvedValue({ ok: true, data: { salary: 2000 } });

    render(
      <LoginForm />
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalled();
      expect(localStorage.getItem('salary')).toBe('2000');
      expect(redirect).toHaveBeenCalledWith('/');
    });
  });

  it('shows error message on failed login', async () => {
    login.mockResolvedValue({ ok: false, error: 'Invalid credentials' });

    render(
      <LoginForm />
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalled();
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });
});