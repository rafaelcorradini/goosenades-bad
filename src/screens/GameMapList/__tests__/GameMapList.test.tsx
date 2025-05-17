import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameMapListScreen from '../index';
import MockAdapter from 'axios-mock-adapter';
import api from '@/common/api';

const mockApi = new MockAdapter(api);

describe('GameMapList', () => {
  beforeEach(() => {
    mockApi.reset();
  });

  it('should show loading state initially', () => {
    render(<GameMapListScreen />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('should show error message when API call fails with 500 status', async () => {
    mockApi.onGet('/maps').reply(500);

    render(<GameMapListScreen />);

    await waitFor(() => {
      const errorElement = screen.getByTestId('error-message');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent('Erro inesperado');
    });
  });

  it('should show forbidden message when API call fails with 403 status', async () => {
    mockApi.onGet('/maps').reply(403);

    render(<GameMapListScreen />);

    await waitFor(() => {
      const errorElement = screen.getByTestId('error-message');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent('Recurso proibido');
    });
  });

  it('should display game maps when API call succeeds', async () => {
    const mockMaps = [
      { id: 1, name: 'Dust II' },
      { id: 2, name: 'Mirage' },
      { id: 3, name: 'Inferno' },
    ];

    mockApi.onGet('/maps').reply(200, mockMaps);

    render(<GameMapListScreen />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Game Map List')).toBeInTheDocument();

    mockMaps.forEach((map) => {
      expect(screen.getByText(map.name)).toBeInTheDocument();
    });
  });

  it('should display empty list when API returns no maps', async () => {
    mockApi.onGet('/maps').reply(200, []);

    render(<GameMapListScreen />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Game Map List')).toBeInTheDocument();

    expect(
      screen.queryByText(/Dust II|Mirage|Inferno/),
    ).not.toBeInTheDocument();
  });
});
