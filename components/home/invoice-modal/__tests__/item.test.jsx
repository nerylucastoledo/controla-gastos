import { render, screen, fireEvent } from '@testing-library/react';
import Item from '../item';

const mockData = [
  {
    name: 'Visa',
    invoices: [
      { _id: '1', item: 'Groceries', value: 'R$ 100', category: 'Alimentação' },
      { _id: '2', item: 'Utilities', value: 'R$ 200', category: 'Casa' },
    ],
    totalInvoice: 300,
  },
];

const mockSetShowModalAction = jest.fn();

describe('Item Component', () => {
  it('should renders correctly with data', () => {
    render(<Item data={mockData} setShowModalAction={mockSetShowModalAction} />);

    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.getByText('R$ 100')).toBeInTheDocument();
    expect(screen.getByText('Utilities')).toBeInTheDocument();
    expect(screen.getByText('R$ 200')).toBeInTheDocument();
  });

  it('should does not render when data is empty', () => {
    render(<Item data={[]} setShowModalAction={mockSetShowModalAction} />);
    
    expect(screen.queryByText('Groceries')).not.toBeInTheDocument();
    expect(screen.queryByText('Utilities')).not.toBeInTheDocument();
  });

  it('should handles edit action', () => {
    render(<Item data={mockData} setShowModalAction={mockSetShowModalAction} />);

    const editButton = screen.getAllByText('Editar')[0];
    fireEvent.click(editButton);

    expect(mockSetShowModalAction).toHaveBeenCalledWith({
      show: true,
      type: 'edit',
      item: { _id: '1', item: 'Groceries', value: 'R$ 100', category: 'Alimentação' },
    });
  });

  it('should handles delete action', () => {
    render(<Item data={mockData} setShowModalAction={mockSetShowModalAction} />);

    const deleteButton = screen.getAllByText('Deletar')[0];
    fireEvent.click(deleteButton);

    expect(mockSetShowModalAction).toHaveBeenCalledWith({
      show: true,
      type: 'delete',
      item: { _id: '1', item: 'Groceries', value: 'R$ 100', category: 'Alimentação' },
    });
  });
});