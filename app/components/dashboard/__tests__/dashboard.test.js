import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../Dashboard';
import useSWR from 'swr';

jest.mock('swr');

const mockDataByMonth = [
  {
    _id: "1",
    username: "testeusername",
    date: "Janeiro2025",
    people: "Eu",
    category: "Transporte",
    value: "R$ 500,00",
    item: "Carro",
    card: "Gastos mensais"
  },
  {
    _id: "2",
    username: "testeusername",
    date: "Fevereiro2025",
    people: "Eu",
    category: "Alimentação",
    value: "R$ 300,00",
    item: "Supermercado",
    card: "Gastos mensais"
  },
  {
    _id: "3",
    username: "testeusername",
    date: "Março2025",
    people: "Eu",
    category: "Transporte",
    value: "R$ 400",
    item: "Gasolina",
    card: "Gastos mensais"
  }
];

const mockData = [
  { month: "Janeiro", value: 1000 },
  { month: "Fevereiro", value: 2000 },
  { month: "Março", value: 3000 }
];

describe('Dashboard Component', () => {
  beforeAll(() => {
    const canvasMock = {
      getContext: jest.fn().mockReturnValue({
        fillRect: jest.fn(),
        clearRect: jest.fn(),
        getImageData: jest.fn(),
        putImageData: jest.fn(),
        createLinearGradient: jest.fn(),
        createPattern: jest.fn(),
        drawImage: jest.fn(),
      }),
    };
  
    document.getElementById = jest.fn((id) => {
      if (id === "bar-chart" || id === "pizza-chart") {
        return canvasMock;
      }
      return null;
    });
  });

  it('renders loading state', () => {
    useSWR.mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    render(<Dashboard dataByMonth={mockDataByMonth} username="testeusername" year="2025" />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders empty state when no data', () => {
    useSWR.mockReturnValue({
      data: [],
      isLoading: false,
    });

    render(<Dashboard dataByMonth={[]} username="testeusername" year="2025" />);
    expect(screen.getByText(/Nada para mostrar no momento/i)).toBeInTheDocument();
  });

  it('renders charts when data is available', () => {
    useSWR.mockReturnValue({
      data: mockData,
      isLoading: false,
    });
  
    const { container } = render(<Dashboard dataByMonth={mockDataByMonth} username="testeusername" year="2025" />);
    
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  
    const wrapperCharts = container.querySelectorAll('.wrapper-chart');
    expect(wrapperCharts).toHaveLength(2); 
  });
});