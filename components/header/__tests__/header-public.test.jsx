import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { HeaderPublic } from '../header-public';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('HeaderPublic Component', () => {
  beforeEach(() => {
    usePathname.mockReturnValue('/login');
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('should renders HeaderPublic with logo and navigation link', () => {
    render(<HeaderPublic />);
    
    expect(screen.getByText('Controla Gastos')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Criar uma conta/i })).toHaveAttribute('href', '/register');
  });
  
  it('should displays "Fazer login" button when path is /register', () => {
    usePathname.mockReturnValue('/register');
    render(<HeaderPublic />);
    
    expect(screen.getByRole('link', { name: /Fazer login/i })).toHaveAttribute('href', '/login');
  });

  it('should displays "Criar uma conta" button when path is /login', () => {
    render(<HeaderPublic />);
    
    expect(screen.getByRole('link', { name: /Criar uma conta/i })).toHaveAttribute('href', '/register');
  });
});
