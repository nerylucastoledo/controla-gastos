import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ModalConfigDelete } from '../modalDeleteConfig';

// Mock the useUser hook
jest.mock('../../../context/user', () => ({
  useUser: jest.fn(),
}));

// Mock the fetcherPost function
jest.mock('../../../utils', () => ({
  ...jest.requireActual('../../../utils'),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => jest.fn(),
}));

describe('ModalConfigDelete Component', () => {
  const mockMutate = jest.fn();
  const mockOnCustomDismiss = jest.fn();

  const itemMock = {
    _id: '1',
    name: 'Test Item',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the modal with the correct item name', () => {
    render(<ModalConfigDelete item={itemMock} mutate={mockMutate} onCustomDismiss={mockOnCustomDismiss} />);

    expect(screen.getByTestId('title-delete')).toBeInTheDocument();
    expect(screen.getByTestId('subtitle-delete')).toHaveTextContent('Quer deletar mesmo Test Item?');
  });

  test('calls mutate and onCustomDismiss when delete button is clicked', async () => {
    const message = 'Deletado com sucesso.';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message }),
      })
    );

    render(<ModalConfigDelete item={itemMock} mutate={mockMutate} onCustomDismiss={mockOnCustomDismiss} />);

    const deleteButton = screen.getByTestId('submit-delete');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledTimes(1);
      expect(mockOnCustomDismiss).toHaveBeenCalledWith(false);
    })
  });

  test('does not crash when item is null', () => {
    render(<ModalConfigDelete item={null} mutate={mockMutate} onCustomDismiss={mockOnCustomDismiss} />);
    
    expect(screen.getByTestId('title-delete')).toBeInTheDocument();
    expect(screen.getByTestId('subtitle-delete')).toHaveTextContent('Quer deletar mesmo ?');
  });

  test('should message error wghen api failed', async () => {
    const message = "API failed"
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message }),
      })
    );

    render(<ModalConfigDelete item={itemMock} mutate={mockMutate} onCustomDismiss={mockOnCustomDismiss} />);

    const deleteButton = screen.getByTestId('submit-delete');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText("API failed")).toBeInTheDocument()
    })
  });
});