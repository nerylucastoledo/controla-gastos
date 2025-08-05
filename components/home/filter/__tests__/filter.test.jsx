import { render, screen, fireEvent } from '@testing-library/react';
import Filter from '../filter';
import { useDate } from '../../../../context/date-context';

jest.mock('../../../../context/date-context', () => ({
  useDate: jest.fn(),
}));

const mockSetDate = jest.fn();

describe('Filter Component', () => {
  beforeEach(() => {
    (useDate).mockReturnValue({
      date: { month: 'January', year: '2023' },
      setDate: mockSetDate,
    });
  });

  it('should renders Filter component with month and year selects', () => {
    render(<Filter />);

    expect(screen.getByRole('combobox', { name: 'Mês' })).toHaveValue('Janeiro');
    expect(screen.getByRole('combobox', { name: 'Ano' })).toHaveValue('2023');
  });

  it('should handles month change', () => {
    render(<Filter />);

    const monthSelect = screen.getByRole('combobox', { name: 'Mês' });
    fireEvent.change(monthSelect, { target: { value: 'Fevereiro' } });

    expect(monthSelect).toHaveValue('Fevereiro');
    expect(mockSetDate).toHaveBeenCalled();
  });

  it('should handles year change', () => {
    render(<Filter />);

    const yearSelect = screen.getByRole('combobox', { name: 'Ano' });
    fireEvent.change(yearSelect, { target: { value: '2022' } });

    expect(yearSelect).toHaveValue('2022');
    expect(mockSetDate).toHaveBeenCalled();
  });
})