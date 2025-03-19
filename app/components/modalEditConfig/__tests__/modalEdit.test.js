import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ModalEditConfig } from '../modalEditConfig';

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

describe('ModalEditConfig Component', () => {
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
    render(<ModalEditConfig item={itemMock} mutate={mockMutate} onCustomDismiss={mockOnCustomDismiss} />);

    expect(screen.getByTestId('title-edit')).toBeInTheDocument();
    expect(screen.getByTestId('subtitle-edit')).toHaveTextContent('Atualize a informação');
  });

  test('calls mutate and onCustomDismiss when edit button is clicked', async () => {
    const message = 'Atualizado com sucesso.';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message }),
      })
    );
    
    render(<ModalEditConfig item={itemMock} mutate={mockMutate} onCustomDismiss={mockOnCustomDismiss} />);

    const editButton = screen.getByTestId('submit-edit');
    fireEvent.click(editButton);

    await waitFor(() => {
      setTimeout(() => {
        expect(screen.getByText(message)).toBeInTheDocument()
      }, 2000);
    })

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledTimes(1);
      expect(mockOnCustomDismiss).toHaveBeenCalledWith(false);
    })
  });

  test('should message error wghen api failed', async () => {
    const message = "API failed"
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message }),
      })
    );

    render(<ModalEditConfig item={itemMock} mutate={mockMutate} onCustomDismiss={mockOnCustomDismiss} />);

    const editButton = screen.getByTestId('submit-edit');
    fireEvent.click(editButton);

    await waitFor(() => {
      setTimeout(() => {
        expect(screen.getByText("API failed")).toBeInTheDocument()
      }, 2000);
    })
  });
});