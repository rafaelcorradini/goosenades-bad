import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NadeListScreen from '../NadeList.tsx';
import MockAdapter from 'axios-mock-adapter';
import api from '@/common/api';

const mockApi = new MockAdapter(api);

describe('NadeList', () => {
  beforeEach(() => {
    mockApi.reset();
  });

  it('should show loading state initially', () => {
    render(<NadeListScreen />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('should show error message when API call fails with 500 status', async () => {
    mockApi.onGet('/nades').reply(500);

    render(<NadeListScreen />);

    await waitFor(() => {
      const errorElement = screen.getByTestId('error-message');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent('Erro inesperado');
    });
  });

  it('should show forbidden message when API call fails with 403 status', async () => {
    mockApi.onGet('/nades').reply(403);

    render(<NadeListScreen />);

    await waitFor(() => {
      const errorElement = screen.getByTestId('error-message');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent('Recurso proibido');
    });
  });

  it('should display game maps when API call succeeds', async () => {
    const mockMaps = [
      { id: 1, name: 'Smoke connector from TR spawn' },
      { id: 2, name: 'Flash connector from TR spawn' },
    ];

    mockApi.onGet('/nades').reply(200, mockMaps);

    render(<NadeListScreen />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Nade List')).toBeInTheDocument();

    mockMaps.forEach((map) => {
      expect(screen.getByText(map.name)).toBeInTheDocument();
    });
  });

  it('should display empty list when API returns no maps', async () => {
    mockApi.onGet('/nades').reply(200, []);

    render(<NadeListScreen />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Nade List')).toBeInTheDocument();

    expect(screen.queryByText(/Smoke|Flash/)).not.toBeInTheDocument();
  });
});
