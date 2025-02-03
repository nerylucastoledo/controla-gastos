import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '../modal';

const back = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    back: back
  }),
}));
describe('Modal Component', () => {
  const mockOnDismiss = jest.fn();

  beforeEach(() => {
    render(
      <Modal onCustomDismiss={mockOnDismiss} background="#fff">
        <h1>Modal Content</h1>
      </Modal>
    );
  });

  test('should render the modal with content', () => {
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  test('should call onCustomDismiss when clicking the close button', () => {
    const closeButton = screen.getByRole('button', { name: /x/i });
    fireEvent.click(closeButton);
    
    expect(mockOnDismiss).toHaveBeenCalled();
  });

  test('should call onDismiss when clicking outside the modal', () => {
    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);
    
    expect(back).toHaveBeenCalled()
    expect(mockOnDismiss).toHaveBeenCalled();
  });

  test('should call onDismiss when Escape key is pressed', () => {
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    
    expect(mockOnDismiss).toHaveBeenCalled();
  });
});