import { render, screen } from '@testing-library/react';
import Item from '../item/item';

describe('Item', () => {
  const mockSetModalAction = jest.fn();

  it('renders with CardDTOOutput', () => {
    const item = { _id: '1', name: 'Test Card', color: 'blue' };
    render(<Item icon={<div>Icon</div>} item={item} setModalAction={mockSetModalAction} />);
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });

  it('renders with PeopleDTOOutput', () => {
    const item = { _id: '2', name: 'Test Person' };
    render(<Item icon={<div>Icon</div>} item={item} setModalAction={mockSetModalAction} />);
    expect(screen.getByText('Test Person')).toBeInTheDocument();
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });

  it('calls setModalAction with edit type', () => {
    const item = { _id: '1', name: 'Test Card', color: 'blue' };
    render(<Item icon={<div>Icon</div>} item={item} setModalAction={mockSetModalAction} />);

    const editButton = screen.getByTestId('edit-button');
    editButton.click();

    expect(mockSetModalAction).toHaveBeenCalledWith({ show: true, type: 'edit', item });
  });

  it('calls setModalAction with delete type', () => {
    const item = { _id: '2', name: 'Test Person' };
    render(<Item icon={<div>Icon</div>} item={item} setModalAction={mockSetModalAction} />);

    const deleteButton = screen.getByTestId('delete-button');
    deleteButton.click();

    expect(mockSetModalAction).toHaveBeenCalledWith({ show: true, type: 'delete', item });
  });
});