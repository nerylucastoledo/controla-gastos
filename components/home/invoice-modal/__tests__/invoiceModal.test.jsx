import { render, screen, fireEvent } from '@testing-library/react';
import InvoiceModal from '../invoiceModal';
import { useRouter } from 'next/navigation';
import { useDate } from '../../../../context/date-context';
import ModalEditInvoice from '../modalEditInvoice';
import ModalDeleteInvoice from '../modalDeleteInvoice';

jest.mock('../modalEditInvoice', () => {
  return jest.fn(() => <div>Edit Modal</div>);
});

jest.mock('../modalDeleteInvoice', () => {
  return jest.fn(() => <div>Delete Modal</div>);
});

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../../../context/date-context', () => ({
  useDate: jest.fn(),
}));

describe('InvoiceModal', () => {
  beforeEach(() => {
    useDate.mockReturnValue({
      date: { month: 'January', year: '2023' },
    });
    jest.clearAllMocks();
  });

  const mockRouter = { back: jest.fn() };
  const mockData = [
    {
      name: 'Test Invoice 1',
      invoices: [
        { _id: '1', item: 'Item 1', value: 'R$ 100,00', category: 'Food' },
        { _id: '2', item: 'Item 2', value: 'R$ 200,00', category: 'Transport' }
      ],
      totalInvoice: 300,
    },
    {
      name: 'Test Invoice 2',
      invoices: [
        { _id: '3', item: 'Item 3', value: 'R$ 150,00', category: 'Entertainment' }
      ],
      totalInvoice: 150,
    },
  ];

  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter);
    jest.clearAllMocks();
  });

  it('renders correctly with data', () => {
    render(<InvoiceModal data={mockData} card="Test Card" />);
    expect(screen.getByText(/Test Card/i)).toBeInTheDocument();
    expect(screen.getByText(/R\$ 300,00/i)).toBeInTheDocument();
  });

  it('calls router back on modal click', () => {
    const { container } = render(<InvoiceModal data={mockData} card="Test Card" />);

    const modalWrapper = container.querySelector('.modal');
    fireEvent.click(modalWrapper);

    expect(mockRouter.back).toHaveBeenCalled();
  });

  it('handles empty data gracefully', () => {
    render(<InvoiceModal data={[]} card="Test Card" />);
    
    expect(mockRouter.back).toHaveBeenCalled();
  });

  it('displays correct filtered data for active name', () => {
    render(<InvoiceModal data={mockData} card="Test Card" />);

    const peopleNames = mockData.map(item => item.name);
    expect(screen.getByText(peopleNames[0])).toBeInTheDocument();
    expect(screen.getByText(peopleNames[1])).toBeInTheDocument();
  });

  it('shows edit modal when edit action is triggered', () => {
    render(<InvoiceModal data={mockData} card="Test Card" />);

    fireEvent.click(screen.getAllByTestId('edit-button')[0]);

    expect(ModalEditInvoice).toHaveBeenCalled();
  });

  it('shows delete modal when delete action is triggered', () => {
    render(<InvoiceModal data={mockData} card="Test Card" />);

    fireEvent.click(screen.getAllByTestId('delete-button')[0]);

    expect(ModalDeleteInvoice).toHaveBeenCalled();
  });
});