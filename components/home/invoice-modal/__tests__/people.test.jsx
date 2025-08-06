import { render, screen, fireEvent } from '@testing-library/react';
import People from '../people';

describe('People Component', () => {
  const mockSetNameActive = jest.fn();

  it('should render unique names as buttons', () => {
    const names = ['Alice', 'Bob', 'Alice', 'Charlie'];
    
    render(<People names={names} nameActive={null} setNameActive={mockSetNameActive} />);

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
    expect(screen.queryAllByRole('button')).toHaveLength(3);
  });

  it('should highlight the active name button', () => {
    const names = ['Alice', 'Bob', 'Charlie'];
    
    render(<People names={names} nameActive="Bob" setNameActive={mockSetNameActive} />);

    const bobButton = screen.getByText('Bob');
    expect(bobButton).toHaveClass('active');
  });

  it('should call setNameActive when a name button is clicked', () => {
    const names = ['Alice', 'Bob', 'Charlie'];
    
    render(<People names={names} nameActive={null} setNameActive={mockSetNameActive} />);

    const charlieButton = screen.getByText('Charlie');
    fireEvent.click(charlieButton);

    expect(mockSetNameActive).toHaveBeenCalledWith('Charlie');
  });
});