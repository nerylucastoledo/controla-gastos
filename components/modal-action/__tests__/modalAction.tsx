import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ModalAction from '../modalAction';

describe('ModalAction', () => {
  const mockHandleCloseModal = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders with title and subtitle', () => {
    render(
      <ModalAction handleCloseModal={mockHandleCloseModal} title="Test Title" subtitle="Test Subtitle">
        <div>Modal Content</div>
      </ModalAction>
    );

    expect(screen.getByText(/test title/i)).toBeInTheDocument();
    expect(screen.getByText(/test subtitle/i)).toBeInTheDocument();
    expect(screen.getByText(/modal content/i)).toBeInTheDocument();
  });

  it('renders without title and subtitle', () => {
    render(
      <ModalAction handleCloseModal={mockHandleCloseModal}>
        <div>Modal Content</div>
      </ModalAction>
    );

    expect(screen.queryByText(/test title/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/test subtitle/i)).not.toBeInTheDocument();
    expect(screen.getByText(/modal content/i)).toBeInTheDocument();
  });

  it('calls handleCloseModal on close button click', () => {
    render(
      <ModalAction handleCloseModal={mockHandleCloseModal}>
        <div>Modal Content</div>
      </ModalAction>
    );

    fireEvent.click(screen.getByTestId('close-button'));
    expect(mockHandleCloseModal).toHaveBeenCalledTimes(1);
  });
});