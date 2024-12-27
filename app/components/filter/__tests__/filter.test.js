import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Filter from '../filter';
import { months, years } from '../../../utils';

describe('Filter component', () => {
  const setMonthMock = jest.fn();
  const setYearMock = jest.fn();
  const currentMonth = months[0];
  const currentYear = years[0].toString();

  beforeEach(() => {
    render(
      <Filter 
        setMonth={setMonthMock} 
        setYear={setYearMock} 
        currentMonth={currentMonth} 
        currentYear={currentYear} 
      />
    );
  });

  test('renders the Filter component', () => {
    const title = screen.getByText("filtro");
    expect(title).toBeInTheDocument();
  });

  test('renders month and year select options', () => {
    const monthSelect = screen.getByText("mês");
    const yearSelect = screen.getByText("ano");

    expect(monthSelect).toBeInTheDocument();
    expect(yearSelect).toBeInTheDocument();

    months.forEach(month => {
      expect(screen.getByText(month === "Marco" ? "Março" : month)).toBeInTheDocument();
    });

    years.forEach(year => {
      expect(screen.getByText(year.toString())).toBeInTheDocument();
    });
  });

  test('calls setMonth when a new month is selected', () => {
    const monthSelect = screen.getByTestId("month-select");
    fireEvent.change(monthSelect, { target: { value: months[1] } });

    expect(setMonthMock).toHaveBeenCalledWith(months[1]);
  });

  test('calls setYear when a new year is selected', () => {
    const yearSelect = screen.getByTestId("year-select");
    fireEvent.change(yearSelect, { target: { value: years[1].toString() } });

    expect(setYearMock).toHaveBeenCalledWith(years[1].toString());
  });

  test('shows the correct selected month and year', () => {
    const monthSelect = screen.getByTestId("month-select");
    const yearSelect = screen.getByTestId("year-select");

    expect(monthSelect.value).toBe(currentMonth);
    expect(yearSelect.value).toBe(currentYear);
  });
});