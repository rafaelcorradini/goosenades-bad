import api from "@/common/api";
import Loading from "@/components/Loading/Loading.tsx";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import { AxiosError } from "axios";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage.tsx";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Image } from "@heroui/image";
import { Card } from "@/components/Card/Card.tsx";

interface GameMapServer {
  id: string;
  name: string;
  image: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
}

interface GameMap {
  id: string;
  name: string;
  backgroundUrl: string;
  logoUrl: string;
}

function GameMapListScreen() {
  const { data, isPending, error } = useQuery<GameMap[], AxiosError>({
    queryFn: async () => {
      const { data } = await api.get<GameMapServer[]>(
        `${import.meta.env.VITE_API_URL}/maps`,
      );
      return data.map((map: GameMapServer) => ({
        id: map.id,
        name: map.name,
        backgroundUrl: map.image,
        logoUrl: map.logo,
      }));
    },
    queryKey: ["map-list"],
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
    <Container>
      <Typography
        marginTop={6}
        marginBottom={4}
        className="text-white/80"
        fontWeight={600}
        fontSize={24}
      >
        Maps
      </Typography>
      <div data-testid="game-map-list" className="grid grid-cols-4 gap-4">
        {data?.map((gameMap) => (
          <Link key={gameMap.id} to={`/map/${gameMap.id}`}>
            <Card
              footer={
                <p className="text-large text-white/80">{gameMap.name}</p>
              }
            >
              <div className="relative w-full h-64">
                <Image
                  className="absolute top-15 left-22 z-99999"
                  alt={`A logo of ${gameMap.name} map`}
                  src={gameMap.logoUrl}
                  width={100}
                  height={100}
                />

                <Image
                  isZoomed
                  isBlurred
                  alt={`A picture of ${gameMap.name} map`}
                  className="object-cover"
                  src={gameMap.backgroundUrl}
                />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}

export default GameMapListScreen;
