import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import LatestExpenses from '../latest-expenses';
import { useUser } from '../../../context/user';

// Mock the useUser hook
jest.mock('../../../context/user', () => ({
  useUser: jest.fn(),
}));

describe('Latest Expenses Component', () => {
  const mockSalary = "R$ 1.000,00"; // Mock salary
  const mockData = [
    {
      _id: "1",
      username: "Lucas",
      date: "Dezembro2024",
      people: "Teste 1",
      category: "Teste category 1",
      value: "R$ 10,00",
      item: "Test Item 1",
      card: "Test Card 1",
    },
    {
      _id: "2",
      username: "Lucas",
      date: "Dezembro2024",
      people: "Teste 2",
      category: "Teste category 2",
      value: "R$ 20,00",
      item: "Test Item 2",
      card: "Test Card 2",
    },
    {
      _id: "3",
      username: "Lucas",
      date: "Dezembro2024",
      people: "Teste 3",
      category: "Teste category 3",
      value: "R$ 30,00",
      item: "Test Item 3",
      card: "Test Card 3",
    },
    {
      _id: "4",
      username: "Lucas",
      date: "Dezembro2024",
      people: "Eu",
      category: "Teste category 4",
      value: "R$ 40,00",
      item: "Test Item 4",
      card: "Test Card 4",
    },
    {
      _id: "5",
      username: "Lucas",
      date: "Dezembro2024",
      people: "Teste 4",
      category: "Teste category 5",
      value: "R$ 50,00",
      item: "Test Item 5",
      card: "Test Card 5",
    },
  ];

  beforeEach(() => {
    (useUser).mockReturnValue({ salary: mockSalary });
  });

  test('renders null when data is undefined', () => {
    const { container } = render(<LatestExpenses data={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders null when data is null', () => {
    const { container } = render(<LatestExpenses data={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders empty state', () => {
    render(<LatestExpenses data={[]} />);
    const emptyText = screen.getByText('nenhum gasto cadastrado esse mês');
    expect(emptyText).toBeInTheDocument();
  });

  it('renders latest expenses', () => {
    render(<LatestExpenses data={mockData} />);

    expect(screen.getByText('últimos gastos')).toBeInTheDocument();

    const expenseItems = screen.getAllByRole('listitem');
    
    expect(expenseItems.length).toBe(5);
    expect(screen.getByText(mockData[0].item)).toBeInTheDocument();
    expect(screen.getByText(mockData[0].people)).toBeInTheDocument();
    expect(screen.getByText(mockData[0].value)).toBeInTheDocument();

    expect(screen.getByText(mockData[1].item)).toBeInTheDocument();
    expect(screen.getByText(mockData[1].people)).toBeInTheDocument();
    expect(screen.getByText(mockData[1].value)).toBeInTheDocument();

    expect(screen.getByText(mockData[2].item)).toBeInTheDocument();
    expect(screen.getByText(mockData[2].people)).toBeInTheDocument();
    expect(screen.getByText(mockData[2].value)).toBeInTheDocument();

    expect(screen.getByText(mockData[3].item)).toBeInTheDocument();
    expect(screen.getByText(mockData[3].people)).toBeInTheDocument();
    expect(screen.getByText(mockData[3].value)).toBeInTheDocument();

    expect(screen.getByText(mockData[4].item)).toBeInTheDocument();
    expect(screen.getByText(mockData[4].people)).toBeInTheDocument();
    expect(screen.getByText(mockData[4].value)).toBeInTheDocument();
  });
});