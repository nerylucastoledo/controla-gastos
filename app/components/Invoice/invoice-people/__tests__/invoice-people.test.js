import '@testing-library/jest-dom';

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { InvoicePeople } from '../invoice-people';
import styles from "../../../styles/components/invoice-people.module.scss";

describe('InvoicePeople', () => {
  let setNameMock;

  beforeEach(() => {
    setNameMock = jest.fn();
  });

  it('renders with the correct name', () => {
    const { getByText } = render(
      <InvoicePeople name="John Doe" nameActive="" setName={setNameMock} />
    );

    expect(getByText('John Doe')).toBeInTheDocument();
  });

  it('applies active styles when name matches nameActive', () => {
    const { getByText } = render(
      <InvoicePeople name="John Doe" nameActive="John Doe" setName={setNameMock} />
    );

    const element = getByText('John Doe');
    expect(element).toHaveClass(styles.active);
  });

  it('does not apply active styles when name does not match nameActive', () => {
    const { getByText } = render(
      <InvoicePeople name="John Doe" nameActive="Jane Doe" setName={setNameMock} />
    );

    const element = getByText('John Doe');
    expect(element).not.toHaveClass(styles.active);
  });

  it('calls setName when clicked', () => {
    const { getByText } = render(
      <InvoicePeople name="John Doe" nameActive="" setName={setNameMock} />
    );

    fireEvent.click(getByText('John Doe'));
    expect(setNameMock).toHaveBeenCalledWith('John Doe');
  });
});