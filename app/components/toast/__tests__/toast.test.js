import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Toast } from '../toast';
import styles from "../../../styles/toast.module.scss";

describe('Toast Component', () => {
  it('renders success message with success class', () => {
    render(<Toast success={true} message={"Test message"} setShowToast={() => {}} show={true} />);
    const toastElement = screen.getByText("Test message");
    expect(toastElement).toBeInTheDocument();
    expect(toastElement.parentElement).toHaveClass(styles.toast_success);
  });

  it('renders error message with error class', () => {
    render(<Toast success={false} message={"Failed message"} setShowToast={() => {}} show={true} />);
    const toastElement = screen.getByText("Failed message");
    expect(toastElement).toBeInTheDocument();
    expect(toastElement.parentElement).toHaveClass(styles.toast_error);
  });

  it('does not render when message is empty', () => {
    const { container } = render(<Toast success={false} message={""} />);
    expect(container.firstChild).toBeNull();
  });
});