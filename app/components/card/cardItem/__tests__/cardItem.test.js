import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { CardItem } from '../cardItem';


describe('CardItem Component', () => {
  const props = {
    color: '#28A745',
    name: 'Test Card',
    value: '1234 5678 9012 3456',
  };

  beforeEach(() => {
    render(<CardItem {...props} />);
  });

  test('should render the card with the correct color', () => {
    const cardElement = screen.getByTestId("card-item");
    expect(cardElement).toHaveStyle({ backgroundColor: props.color });
  });

  test('should render the card name', () => {
    expect(screen.getByText('Test Card')).toBeInTheDocument();
  });

  test('should render the masked card number', () => {
    expect(screen.getByText('**** **** **** ****')).toBeInTheDocument();
  });

  test('should render the card value', () => {
    expect(screen.getByText('1234 5678 9012 3456')).toBeInTheDocument();
  });

  test('should render the credit card icon', () => {
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});