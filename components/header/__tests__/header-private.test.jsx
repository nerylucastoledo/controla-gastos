import { render, screen, fireEvent } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import logout from "../../../actions/logout";
import { HeaderPrivate } from '../header-private';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('../../../actions/logout', () => jest.fn());

describe('HeaderPrivate Component', () => {
  beforeEach(() => {
    usePathname.mockReturnValue('/');
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should renders HeaderPrivate with correct links', () => {
    render(<HeaderPrivate />);
    
    expect(screen.getByText('Controla Gastos')).toBeInTheDocument();
    expect(screen.getByText('Ínicio')).toBeInTheDocument();
    expect(screen.getByText('Transação')).toBeInTheDocument();
    expect(screen.getByText('Novo')).toBeInTheDocument();
    expect(screen.getByText('Conta')).toBeInTheDocument();
  });

  it('should logout button removes salary from localStorage and calls logout', async () => {
    const localStorageMock = {
      removeItem: jest.fn(),
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
  
    render(<HeaderPrivate />);
    const logoutButton = screen.getAllByLabelText('Sair da conta')[0];
  
    await fireEvent.click(logoutButton);
  
    expect(window.localStorage.removeItem).toHaveBeenCalledWith('salary');
    expect(logout).toHaveBeenCalled();
  });

  it('should highlights active link based on pathname', () => {
    usePathname.mockReturnValue('/new-expense');
    render(<HeaderPrivate />);
    
    expect(screen.getByText('Transação').closest('li')).toHaveClass('active');
    expect(screen.getByText('Ínicio').closest('li')).not.toHaveClass('active');
  });
  
  it('should calls logout on logout button click', async () => {
    render(<HeaderPrivate />);
    const logoutButton = screen.getAllByLabelText('Sair da conta')[0];
  
    await fireEvent.click(logoutButton);
  
    expect(logout).toHaveBeenCalledTimes(1);
  });
})



