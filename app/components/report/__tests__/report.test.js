import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Report } from '../report';

const mockData = [
  { people: 'Alice', value: 'R$ 100,00' },
  { people: 'Bob', value: 'R$ 200,00' },
  { people: 'Alice', value: 'R$ 150,00' },
];

describe('Report Component', () => {
  test('renders the component with a title', () => {
    render(<Report data={[]} />);
    expect(screen.getByText(/fatura/i)).toBeInTheDocument();
  });

  test('displays empty state when no data is provided', () => {
    render(<Report data={[]} />);
    expect(screen.getByText(/nada até o momento/i)).toBeInTheDocument();
  });

  test('renders the correct invoices when data is provided', () => {
    render(<Report data={mockData} />);
    
    expect(screen.getByText(/Alice/i)).toBeInTheDocument();
    expect(screen.getByText(/R\$ 250,00/i)).toBeInTheDocument();
    expect(screen.getByText(/Bob/i)).toBeInTheDocument();
    expect(screen.getByText(/R\$ 200,00/i)).toBeInTheDocument();
  });

  test('handles multiple entries for the same person correctly', () => {
    render(<Report data={mockData} />);
    
    const aliceInvoice = screen.getByText(/Alice/i);
    const bobInvoice = screen.getByText(/Bob/i);
    
    expect(aliceInvoice).toBeInTheDocument();
    expect(bobInvoice).toBeInTheDocument();
    
    // Verify the correct values
    expect(screen.getByText(/R\$ 250,00/i)).toBeInTheDocument();
    expect(screen.getByText(/R\$ 200,00/i)).toBeInTheDocument();
  });

  test('displays the correct currency formatting', () => {
    render(<Report data={mockData} />);
    expect(screen.getByText(/R\$ 250,00/i)).toBeInTheDocument();
    expect(screen.getByText(/R\$ 200,00/i)).toBeInTheDocument();
  });
});