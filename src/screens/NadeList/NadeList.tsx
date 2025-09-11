import { useCallback, useEffect, useState } from "react";
import api from "@/common/api";
import Loading from "@/components/Loading/Loading.tsx";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import axios, { AxiosResponse } from "axios";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage.tsx";
import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/Card/Card.tsx";
import { Image } from "@heroui/image";

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

export type NadeType = "SMOKE" | "FLASH" | "HE" | "MOLOTOV";

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

function NadeListScreen() {
  const { id: mapId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosResponse<NadeErrorResponse>>();
  const [data, setData] = useState<Nade[]>([]);

  const getNades = useCallback(async () => {
    try {
      const res = await api.get(
        `${import.meta.env.VITE_API_URL}/maps/${mapId}/nades`,
      );
      setData(
        res.data.map((nade: NadeServer) => ({
          id: nade.id,
          type: nade.type as NadeType,
          lineUpVideoUrl: nade.line_up_video_url,
          gameMapId: nade.gamep_map,
          name: nade.name,
          thumbUrl: nade.thumb_url,
        })),
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorResponse = err.response as AxiosResponse<NadeErrorResponse>;
        setError(errorResponse);
      }
    } finally {
      setLoading(false);
    }
  }, [mapId]);

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
    <Container>
      <Typography
        marginTop={6}
        marginBottom={4}
        className="text-white/80"
        fontWeight={600}
        fontSize={24}
      >
        Nades lineups
      </Typography>
      <div data-testid="nade-list" className="grid grid-cols-4 gap-4">
        {data?.map((nade) => (
          <Link key={nade.id} to={`/nades/${nade.id}`}>
            <Card
              footer={<p className="text-large text-white/80 ">{nade.name}</p>}
            >
              <Image
                isZoomed
                isBlurred
                alt={`A picture of ${nade.name} lineup`}
                className="object-cover"
                height={250}
                src={nade.thumbUrl}
              />
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}

export default NadeListScreen;
