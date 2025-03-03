import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewOption from '../page';
import { Providers } from '../../../providers';

// Mock da função fetcherPost
jest.mock('../../../utils', () => ({
  ...jest.requireActual('../../../utils'),
}));
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe('NewOption Component', () => {
  beforeEach(() => {
    render(<Providers><NewOption /></Providers>);
  });

  test('should render the form and elements', () => {
    expect(screen.getByText('Cadastre a opção')).toBeInTheDocument();
    expect(screen.getByLabelText('O que?')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cadastrar/i })).toBeInTheDocument();
  });

  test('should enable the color input when "cards" is selected', () => {
    const typeSelect = screen.getByTestId('name-select');
    fireEvent.change(typeSelect, { target: { value: 'cards' } });
    
    expect(screen.getByLabelText('Cor')).toBeInTheDocument();
  });

  test('should not enable the color input when "people" is selected', () => {
    const typeSelect = screen.getByTestId('name-select');
    fireEvent.change(typeSelect, { target: { value: 'peoples' } });
    
    expect(screen.queryByLabelText('Cor')).not.toBeInTheDocument();
  });
  

  test('should submit the form and show success toast', async () => {
    // Mock da API para simular um erro
    const message = 'Opção cadastrada.';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message }),
      })
    );
  
    fireEvent.change(screen.getByTestId('name-select'), { target: { value: 'cards' } });
    fireEvent.change(screen.getByTestId('name'), { target: { value: 'My Card' } });
    fireEvent.change(screen.getByTestId('cor'), { target: { value: '#ff0000' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Cadastrar/i }));

    expect(await screen.findByText(message)).toBeInTheDocument();
  });

  test('should show an error toast on failure', async () => {
    const message = 'Ocorreu um erro no cadastro.';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message }),
      })
    );
    
    fireEvent.change(screen.getByTestId('name-select'), { target: { value: 'cards' } });
    fireEvent.change(screen.getByTestId('name'), { target: { value: 'My Card' } });
    fireEvent.change(screen.getByTestId('cor'), { target: { value: '#ff0000' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Cadastrar/i }));

    expect(await screen.findByText(message)).toBeInTheDocument();
  });
});