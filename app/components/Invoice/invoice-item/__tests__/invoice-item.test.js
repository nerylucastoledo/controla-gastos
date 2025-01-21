import '@testing-library/jest-dom';

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InvoiceItem } from '../invoice-item';

describe('InvoiceItem Component', () => {
  const mockOpenModal = jest.fn();
  const invoiceData = [
    { _id: '1', item: 'Invoice 1', value: '100', category: 'Food' },
    { _id: '2', item: 'Invoice 2', value: '200', category: 'Transport' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders invoice items correctly', () => {
    render(<InvoiceItem data={invoiceData} openModal={mockOpenModal} />);

    expect(screen.getByText('Invoice 1')).toBeInTheDocument();
    expect(screen.getByText('Invoice 2')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
  });

  test('calls openModal with edit action when edit button is clicked', () => {
    render(<InvoiceItem data={invoiceData} openModal={mockOpenModal} />);

    const editButton = screen.getAllByRole('button')[0];
    fireEvent.click(editButton);

    expect(mockOpenModal).toHaveBeenCalledWith(invoiceData[0], 'edit');
  });

  test('calls openModal with delete action when delete button is clicked', () => {
    render(<InvoiceItem data={invoiceData} openModal={mockOpenModal} />);

    const deleteButton = screen.getAllByRole('button')[1];
    fireEvent.click(deleteButton);

    expect(mockOpenModal).toHaveBeenCalledWith(invoiceData[0], 'delete');
  });

  test('renders the buttons correctly', () => {
    render(<InvoiceItem data={invoiceData} openModal={mockOpenModal} />);

    const editButton = screen.getAllByRole('button')[0];
    const deleteButton = screen.getAllByRole('button')[1];

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });
});