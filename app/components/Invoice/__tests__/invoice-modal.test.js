import '@testing-library/jest-dom';

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { InvoiceModal } from '../invoice-modal';
import useSWR from 'swr';

// Mockando o hook useSWR
jest.mock('swr');
jest.mock('next/navigation', () => ({
  useRouter: () => jest.fn(),
}));

const mockData = [
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
];

describe('InvoiceModal', () => {
  let onDismissMock;

  beforeEach(() => {
    onDismissMock = jest.fn();
    useSWR.mockReturnValue({ data: mockData, error: null, isLoading: false, mutate: jest.fn() });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with data', () => {
    const { getByText } = render(
      <InvoiceModal 
        username="testuser" 
        date="2023-10-10" 
        card="test" 
        backgroundColor="#fff" 
        onDismiss={onDismissMock} 
      />
    );

    expect(getByText('Alessa')).toBeInTheDocument();
    expect(getByText('Total: R$ 150,00')).toBeInTheDocument();
  });

  it('opens edit modal', async () => {
    const { getByText, getByTestId, getAllByTestId } = render(
      <InvoiceModal 
        username="testuser" 
        date="2023-10-10" 
        card="test" 
        backgroundColor="#fff" 
        onDismiss={onDismissMock} 
      />
    );

    fireEvent.click(getByText('Alessa'));
    fireEvent.click(getAllByTestId('edit-button')[0]);

    expect(getByText('Atualizar o gasto')).toBeInTheDocument();
    expect(getByTestId('item').value).toEqual("Teste item 1");
    expect(getByTestId('value').value).toEqual("R$ 10,00");
  });

  it('displays success message when updating item', async () => {
    const mutateMock = jest.fn();
    useSWR.mockReturnValue({ data: mockData, error: null, isLoading: false, mutate: mutateMock });
    
    // Mock da API
    const message = 'Gasto atualizado com sucesso!';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message }),
      })
    );

    const { getByTestId, getByText, getAllByTestId } = render(
      <InvoiceModal 
        username="testuser" 
        date="2023-10-10" 
        card="test" 
        backgroundColor="#fff" 
        onDismiss={onDismissMock} 
      />
    );

    fireEvent.click(getByText('Alessa'));
    fireEvent.click(getAllByTestId('edit-button')[0]);

    fireEvent.change(getByTestId('item'), { target: { value: "Item update" } });
    fireEvent.change(getByTestId('value'), { target: { value: "R$ 100,00" } });

    fireEvent.click(getAllByTestId('submit-edit')[0]);

    await waitFor(() => {
      expect(getByText(message)).toBeInTheDocument();
    });

    expect(mutateMock).toHaveBeenCalled();
  });

  it('displays error message when updating item', async () => {
    const mutateMock = jest.fn();
    useSWR.mockReturnValue({ data: mockData, error: null, isLoading: false, mutate: mutateMock });
  
    // Mock da API para simular um erro
    const message = 'Ocorreu um erro interno! Tente novamente';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message }),
      })
    );
  
    const { getByTestId, getByText, getAllByTestId } = render(
      <InvoiceModal 
        username="testuser" 
        date="2023-10-10" 
        card="test" 
        backgroundColor="#fff" 
        onDismiss={onDismissMock} 
      />
    );
  
    fireEvent.click(getByText('Alessa'));
    fireEvent.click(getAllByTestId('edit-button')[0]);
  
    fireEvent.change(getByTestId('item'), { target: { value: "Item update" } });
    fireEvent.change(getByTestId('value'), { target: { value: "R$ 100,00" } });
  
    fireEvent.click(getAllByTestId('submit-edit')[0]);
  
    await waitFor(() => {
      expect(getByText(message)).toBeInTheDocument();
    });
  
    expect(mutateMock).not.toHaveBeenCalled();
  });

  it('handles delete modal', async () => {
    const { getByText, getByTestId, getAllByTestId } = render(
      <InvoiceModal 
        username="testuser" 
        date="2023-10-10" 
        card="test" 
        backgroundColor="#fff" 
        onDismiss={onDismissMock} 
      />
    );
  
    fireEvent.click(getByText('Alessa'));
    fireEvent.click(getAllByTestId('delete-button')[0]);
  
    expect(getByText('Deletar o gasto')).toBeInTheDocument();
  
    const messageElement = getByTestId('text-remove');
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveTextContent('Após deletar não será possível recuperar');
    expect(messageElement).toHaveTextContent('tem certeza que quer deletar a(o)');
    expect(messageElement).toHaveTextContent('Teste item 1');
  });

  it('displays success message when deleting item', async () => {
    const mutateMock = jest.fn();
    useSWR.mockReturnValue({ data: mockData, error: null, isLoading: false, mutate: mutateMock });
    
    // Mock da API
    const message = 'Gasto deletado com sucesso!';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message }),
      })
    );

    const { getByText, getAllByTestId } = render(
      <InvoiceModal 
        username="testuser" 
        date="2023-10-10" 
        card="test" 
        backgroundColor="#fff" 
        onDismiss={onDismissMock} 
      />
    );

    fireEvent.click(getByText('Alessa'));
    fireEvent.click(getAllByTestId('delete-button')[0]);
    fireEvent.click(getAllByTestId('submit-delete')[0]);

    await waitFor(() => {
      expect(getByText(message)).toBeInTheDocument();
    });

    expect(mutateMock).toHaveBeenCalled();
  });

  it('displays error message when deleting item', async () => {
    const mutateMock = jest.fn();
    useSWR.mockReturnValue({ data: mockData, error: null, isLoading: false, mutate: mutateMock });
  
    // Mock da API para simular um erro
    const message = 'Ocorreu um erro interno! Tente novamente';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message }),
      })
    );
  
    const { getByText, getAllByTestId } = render(
      <InvoiceModal 
        username="testuser" 
        date="2023-10-10" 
        card="test" 
        backgroundColor="#fff" 
        onDismiss={onDismissMock} 
      />
    );
  
    fireEvent.click(getByText('Alessa'));
    fireEvent.click(getAllByTestId('delete-button')[0]);
    fireEvent.click(getAllByTestId('submit-delete')[0]);
  
    await waitFor(() => {
      expect(getByText(message)).toBeInTheDocument();
    });
  
    expect(mutateMock).not.toHaveBeenCalled();
  });

  test('renders null when data is null', () => {
    useSWR.mockReturnValue({ data: null, error: 'Error fetching data', isLoading: false, mutate: jest.fn() });
    const { container } = render(
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

  // it('closes modal on dismiss', () => {
  //   const { getByText } = render(
  //     <InvoiceModal 
  //       username="testuser" 
  //       date="2023-10-10" 
  //       card="test" 
  //       backgroundColor="#fff" 
  //       onDismiss={onDismissMock} 
  //     />
  //   );

  //   fireEvent.click(getByText('Fechar'));
  //   expect(onDismissMock).toHaveBeenCalled();
  // });
});