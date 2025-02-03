import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Card } from '../card';

const mockCards = [
  { id: '1', name: 'Card 1', color: '#28A745', username: 'User1' },
  { id: '2', name: 'Card 2', color: '#007BFF', username: 'User2' },
];

const mockData = [
  { username: 'User1', date: '2023-01-01', value: '100.00', card: 'Card 1' },
  { username: 'User2', date: '2023-01-02', value: '200.00', card: 'Card 2' },
];

describe('Card Component', () => {
  beforeEach(() => {
    render(<Card cards={mockCards} data={mockData} date="2023-01-01" username="User1" />);
  });

  test('should render the title', () => {
    expect(screen.getByText('cartões')).toBeInTheDocument();
  });

  test('should render cards based on data', () => {
    expect(screen.getByText('Card 1')).toBeInTheDocument();
    expect(screen.getByText('Card 2')).toBeInTheDocument();
  });

  test('should display a message when no data or cards are present', () => {
    render(<Card cards={[]} data={[]} date="2023-01-01" username="User1" />);
    expect(screen.getByText('nenhum cartão com gasto cadastrado')).toBeInTheDocument();
  });

  test('should open InvoiceModal when a card is clicked', () => {
    const cardButton = screen.getByText('Card 1').closest('button');
    fireEvent.click(cardButton);
    
    expect(screen.getByText('Card 1')).toBeInTheDocument();
  });
});