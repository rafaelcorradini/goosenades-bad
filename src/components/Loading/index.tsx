import { CircularProgress, Container } from '@mui/material';
import { Box } from '@mui/system';

const Loading = () => {
  return (
    <Container maxWidth="sm" data-testid="loading">
      <Box mt={4} textAlign="center">
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={4}
        >
          <CircularProgress />
        </Box>
      </Box>
    </Container>
  );
};

export default Loading;
