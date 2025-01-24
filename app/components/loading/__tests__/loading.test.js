import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '../loading-icon';
import styles from "../../../styles/loading.module.scss";

describe('Loading Component', () => {
  it('renders correctly', () => {
    render(<Loading />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it('displays loading icon', () => {
    render(<Loading />);
    const loadingIcon = screen.getByTestId("loading").querySelector('svg');
    expect(loadingIcon).toBeInTheDocument();
    expect(loadingIcon).toHaveAttribute('width', '48'); 
    expect(loadingIcon).toHaveAttribute('height', '48');
  });

  it('has the correct loading class', () => {
    render(<Loading />);
    expect(screen.getByTestId("loading")).toHaveClass(styles.loading);
  });
});