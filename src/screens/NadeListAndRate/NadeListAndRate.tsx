import { useCallback, useEffect, useState } from 'react';
import api from '@/common/api';
import Loading from '@/components/Loading/Loading.tsx';
import { Button, Card } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios, { AxiosResponse } from 'axios';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage.tsx';

interface NadeServer {
  id: string;
  name: string;
  type: string;
  line_up_video_url: string;
  gamep_map: string;
  createdAt: string;
  updatedAt: string;
}

export type NadeType = 'SMOKE' | 'FLASH' | 'HE' | 'MOLOTOV';

interface Nade {
  id: string;
  type: NadeType;
  lineUpVideoUrl: string;
  gameMapId: string;
}

interface NadeErrorResponse {
  message: string;
}

function NadeListAndRateScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosResponse<NadeErrorResponse>>();
  const [data, setData] = useState<Nade[]>([]);
  const [loadingRate, setLoadingRate] = useState(false);
  const [rateError, setRateError] =
    useState<AxiosResponse<NadeErrorResponse>>();

  const getNades = useCallback(async () => {
    setLoadingRate(true);
    try {
      const res = await api.get('/nades');
      setData(
        res.data.map((nade: NadeServer) => ({
          id: nade.id,
          type: nade.type as NadeType,
          lineUpVideoUrl: nade.line_up_video_url,
          gameMapId: nade.gamep_map,
        })),
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorResponse = err.response as AxiosResponse<NadeErrorResponse>;
        setError(errorResponse);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const rateNade = useCallback(async (nadeId: string, rate: number) => {
    setLoadingRate(true);
    try {
      await api.post(`/nades/${nadeId}`, {
        rate_of_nade: rate,
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorResponse = err.response as AxiosResponse<NadeErrorResponse>;
        setRateError(errorResponse);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getNades();
  }, [getNades]);

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
      <h1>Nade List</h1>
      {data.map((nade) => (
        <Card key={nade.id}>
          <Typography key={nade.id}>{nade.lineUpVideoUrl}</Typography>
          <Button
            onClick={() => rateNade(nade.id, 10)}
            disabled={loadingRate}
          />
          <Typography key={nade.id}>
            {rateError ? 'Erro ao avaliar' : null}
          </Typography>
        </Card>
      ))}
    </div>
  );
}

export default NadeListAndRateScreen;
