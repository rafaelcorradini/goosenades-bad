import { useCallback, useEffect, useState } from 'react';
import api from '@/common/api';
import Loading from '@/components/Loading/Loading.tsx';
import { Card, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios, { AxiosResponse } from 'axios';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage.tsx';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';

interface NadeServer {
  id: string;
  name: string;
  type: string;
  thumb_url: string;
  line_up_video_url: string;
  gamep_map: string;
  createdAt: string;
  updatedAt: string;
}

export type NadeType = 'SMOKE' | 'FLASH' | 'HE' | 'MOLOTOV';

interface Nade {
  id: string;
  name: string;
  type: NadeType;
  lineUpVideoUrl: string;
  gameMapId: string;
  thumbUrl: string;
}

interface NadeErrorResponse {
  message: string;
}

function NadeDetails() {
  const { id: nadeId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosResponse<NadeErrorResponse>>();
  const [data, setData] = useState<Nade>();
  const [loadingRate, setLoadingRate] = useState(false);
  const [errorRate, setErrorRate] =
    useState<AxiosResponse<NadeErrorResponse>>();
  const [loadingBookmark, setLoadingBookmark] = useState(false);
  const [errorBookmark, setErrorBookmark] =
    useState<AxiosResponse<NadeErrorResponse>>();

  const getNadeById = useCallback(async () => {
    setLoadingRate(true);
    try {
      const { data } = await api.get<NadeServer>(
        `${import.meta.env.VITE_API_URL}/nades/${nadeId}`,
      );
      setData({
        id: data.id,
        type: data.type as NadeType,
        lineUpVideoUrl: data.line_up_video_url,
        gameMapId: data.gamep_map,
        name: data.name,
        thumbUrl: data.thumb_url,
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorResponse = err.response as AxiosResponse<NadeErrorResponse>;
        setError(errorResponse);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, [nadeId]);

  const rateNade = useCallback(async (nadeId: string, rate: number) => {
    setLoadingRate(true);
    try {
      await api.post(`${import.meta.env.VITE_API_URL}/nades/${nadeId}/rate`, {
        rate_of_nade: rate,
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorResponse = err.response as AxiosResponse<NadeErrorResponse>;
        setErrorRate(errorResponse);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const bookmarkNade = useCallback(async (nadeId: string) => {
    setLoadingBookmark(true);
    try {
      await api.post(
        `${import.meta.env.VITE_API_URL}/nades/${nadeId}/bookmark`,
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorResponse = err.response as AxiosResponse<NadeErrorResponse>;
        setErrorBookmark(errorResponse);
      }
    } finally {
      setLoadingBookmark(false);
    }
  }, []);

  useEffect(() => {
    getNadeById();
  }, [getNadeById]);

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
    <Container>
      <Typography
        marginTop={6}
        marginBottom={4}
        className="text-white/80"
        fontWeight={600}
        fontSize={24}>
        {data.name}
      </Typography>
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <div className="w-full aspect-video ">
            <ReactPlayer
              src={data.lineUpVideoUrl}
              controls
              width="100%"
              height="100%"
            />
          </div>
        </Card>
        <Card>
          <div className="p-4 flex justify-between">
            <div>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map(rating => (
                  <button
                    key={rating}
                    onClick={() => rateNade(data.id, rating)}
                    className="p-2 text-yellow-400 hover:text-yellow-500 focus:outline-none"
                    disabled={loadingRate}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={0}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </button>
                ))}
              </div>
              {errorRate ? (
                <Typography className="text-red-500 mt-2">
                  {errorRate.data.message}
                </Typography>
              ) : null}
            </div>
            <div>
              <button
                data-testid="bookmark-button"
                onClick={() => bookmarkNade(data.id)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
                disabled={loadingBookmark}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={0}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
              {errorBookmark ? (
                <Typography className="text-red-500 mt-2">
                  {errorBookmark.data.message}
                </Typography>
              ) : null}
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
}

export default NadeDetails;
