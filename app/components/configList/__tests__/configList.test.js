import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfigList } from '../list';

// Mock data for the tests
const mockData = [
  { _id: '1', name: 'John Doe', username: 'johndoe' },
  { _id: '2', name: 'Jane Doe', username: 'janedoe' }
];

// Mock function for the modal
const mockOpenModal = jest.fn();

describe('ConfigList Component', () => {
  beforeEach(() => {
    render(<ConfigList data={mockData} openModal={mockOpenModal} />);
  });

  test('should render the list of people', () => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  test('should have an edit button for each item', () => {
    const editButtons = screen.getAllByTestId('edit-button');
    expect(editButtons).toHaveLength(mockData.length);
  });

  test('should call openModal with "PUT" when clicking the edit button', () => {
    const editButton = screen.getAllByTestId('edit-button')[0];
    fireEvent.click(editButton);
    
    expect(mockOpenModal).toHaveBeenCalledWith(mockData[0], 'PUT');
  });

  test('should have a delete button for each item', () => {
    const deleteButtons = screen.getAllByTestId('delete-button');
    expect(deleteButtons).toHaveLength(mockData.length);
  });

  test('should call openModal with "DELETE" when clicking the delete button', () => {
    const deleteButton = screen.getAllByTestId('delete-button')[0];
    fireEvent.click(deleteButton);
    
    expect(mockOpenModal).toHaveBeenCalledWith(mockData[0], 'DELETE');
  });
});