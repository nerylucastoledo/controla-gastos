import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { InvoiceModal } from '../invoice-modal';
import useSWR, { useSWRConfig } from "swr";
import { DateProvider } from '../../../context/date';

// Mockando o hook useSWR
jest.mock('swr');
jest.mock('next/navigation', () => ({
  useRouter: () => jest.fn(),
}));

const mockData = {
  data: [
    {
      name: "Alessa",
      invoices: [
        { item: "Teste item 1", value: "R$ 10,00", _id: "1", category: "Outros" },
        { item: "Teste item 2", value: "R$ 20,00", _id: "2", category: "transporte" },
        { item: "Teste item 3", value: "R$ 30,00", _id: "3", category: "vestuario" },
        { item: "Teste item 4", value: "R$ 40,00", _id: "4", category: "alimentacao" },
        { item: "Teste item 5", value: "R$ 50,00", _id: "5", category: "vestuario" }
      ],
      totalInvoice: 150.00
    },

    {
      name: "Teste 2",
      invoices: [
        { item: "Teste item 1", value: "R$ 10,00", _id: "1", category: "Outros" },
      ],
      totalInvoice: 10.00
    },
  ]
};

describe('InvoiceModal', () => {
  let onDismissMock;

  beforeEach(() => {
    onDismissMock = jest.fn();
    useSWRConfig.mockReturnValue({ mutate: jest.fn() });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProviders = (ui) => {
    return render(<DateProvider>{ui}</DateProvider>);
  };

  it('renders loading', () => {
    useSWR.mockReturnValue({ data: { data: [] }, error: null, isLoading: true, mutate: jest.fn() });

    renderWithProviders(
      <InvoiceModal 
        username="testuser" 
        date="2023-10-10" 
        card="test" 
        backgroundColor="#fff" 
        onDismiss={onDismissMock} 
      />
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders correctly with data', () => {
    useSWR.mockReturnValue({ data: mockData, error: null, isLoading: false, mutate: jest.fn() });
    
    renderWithProviders(
      <InvoiceModal 
        username="testuser" 
        date="2023-10-10" 
        card="test" 
        backgroundColor="#fff" 
        onDismiss={onDismissMock} 
      />
    );

    expect(screen.getByText('Alessa')).toBeInTheDocument();
    expect(screen.getByText('Total: R$ 150,00')).toBeInTheDocument();
  });

  // ... outros testes

  test('renders null when data is null', () => {
    useSWR.mockReturnValue({ data: null, error: 'Error fetching data', isLoading: false, mutate: jest.fn() });
    const { container } = renderWithProviders(
      <InvoiceModal 
        username="testuser" 
        date="2023-10-10" 
        card="test" 
        backgroundColor="#fff" 
        onDismiss={onDismissMock} 
      />
    );
    expect(container.firstChild).toBeNull();
  });
});