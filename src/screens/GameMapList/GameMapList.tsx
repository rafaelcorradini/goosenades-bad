import api from '@/common/api';
import Loading from '@/components/Loading/Loading.tsx';
import { Card } from '@mui/material';
import Typography from '@mui/material/Typography';
import { AxiosError } from 'axios';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage.tsx';
import { useQuery } from '@tanstack/react-query';

interface GameMapServer {
  id: number;
  map_name: string;
}

interface GameMap {
  id: number;
  name: string;
}

function GameMapListScreen() {
  const { data, isPending, error } = useQuery<GameMap[], AxiosError>({
    queryFn: async () => {
      const { data } = await api.get<GameMapServer[]>('/nades');
      return data.map((nade: GameMapServer) => ({
        id: nade.id,
        name: nade.map_name,
      }));
    },
    queryKey: ['nade-list'],
  });

  if (isPending) {
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
      <h1>GameMap List</h1>
      {data?.map((nade) => (
        <Card key={nade.id}>
          <Typography key={nade.id}>{nade.name}</Typography>
        </Card>
      ))}
    </div>
  );
}

export default GameMapListScreen;
