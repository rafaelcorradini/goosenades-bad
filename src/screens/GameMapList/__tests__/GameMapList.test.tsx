import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameMapListScreen from '../GameMapList.tsx';
import MockAdapter from 'axios-mock-adapter';
import api from '@/common/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockApi = new MockAdapter(api);

// Create a wrapper component with QueryClientProvider
const renderWithQueryClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

describe('GameMapList', () => {
  beforeEach(() => {
    mockApi.reset();
  });

  it('should show loading state initially', () => {
    renderWithQueryClient(<GameMapListScreen />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('should show error message when API call fails with 500 status', async () => {
    mockApi.onGet('/nades').reply(500);

    renderWithQueryClient(<GameMapListScreen />);

    await waitFor(() => {
      const errorElement = screen.getByTestId('error-message');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent('Erro inesperado');
    });
  });

  it('should show forbidden message when API call fails with 403 status', async () => {
    mockApi.onGet('/nades').reply(403);

    renderWithQueryClient(<GameMapListScreen />);

    await waitFor(() => {
      const errorElement = screen.getByTestId('error-message');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent('Recurso proibido');
    });
  });

  it('should display game maps when API call succeeds', async () => {
    const mockServerMaps = [
      { id: 1, map_name: 'Dust 2' },
      { id: 2, map_name: 'Mirage' },
    ];

    mockApi.onGet('/nades').reply(200, mockServerMaps);

    renderWithQueryClient(<GameMapListScreen />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    expect(screen.getByText('GameMap List')).toBeInTheDocument();

    // Check that the transformed data is displayed correctly
    mockServerMaps.forEach((map) => {
      expect(screen.getByText(map.map_name)).toBeInTheDocument();
    });
  });

  it('should transform API data correctly', async () => {
    const mockServerMaps = [
      { id: 1, map_name: 'Dust 2' },
      { id: 2, map_name: 'Mirage' },
    ];

    mockApi.onGet('/nades').reply(200, mockServerMaps);

    renderWithQueryClient(<GameMapListScreen />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Verify that the data transformation from GameMapServer to GameMap works correctly
    mockServerMaps.forEach((serverMap) => {
      expect(screen.getByText(serverMap.map_name)).toBeInTheDocument();
    });
  });

  it('should display empty list when API returns no maps', async () => {
    mockApi.onGet('/nades').reply(200, []);

    renderWithQueryClient(<GameMapListScreen />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    expect(screen.getByText('GameMap List')).toBeInTheDocument();

    // Verify no map items are rendered
    expect(screen.queryByText(/Dust|Mirage/)).not.toBeInTheDocument();
  });
});
