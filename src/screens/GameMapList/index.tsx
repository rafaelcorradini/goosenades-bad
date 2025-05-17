import { useCallback, useEffect, useState } from 'react';
import api from '@/common/api';
import Loading from '@/components/Loading';
import { Card } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios, { AxiosResponse } from 'axios';
import ErrorMessage from '@/components/ErrorMessage';

interface GameMap {
  id: number;
  name: string;
}

interface GameMapErrorResponse {
  message: string;
}

function GameMapListScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosResponse<GameMapErrorResponse>>();
  const [data, setData] = useState<GameMap[]>([]);

  const getMaps = useCallback(async () => {
    try {
      const res = await api.get('/maps');
      setData(res.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorResponse =
          err.response as AxiosResponse<GameMapErrorResponse>;
        setError(errorResponse);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getMaps();
  }, [getMaps]);

  if (loading || !data) {
    return <Loading />;
  }

  if (error && error.status === 500) {
    return <ErrorMessage>Erro inesperado</ErrorMessage>;
  }

  if (error && error.status === 403) {
    return <ErrorMessage>Recurso proibido</ErrorMessage>;
  }

  return (
    <div>
      <h1>Game Map List</h1>
      {data.map((gameMap) => (
        <Card key={gameMap.id}>
          <Typography key={gameMap.id}>{gameMap.name}</Typography>
        </Card>
      ))}
    </div>
  );
}

export default GameMapListScreen;
