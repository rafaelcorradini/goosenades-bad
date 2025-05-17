import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { PropsWithChildren } from 'react';

function ErrorMessage(props: PropsWithChildren) {
  return (
    <Container maxWidth="sm" data-testid="error-message">
      <Box mt={4} textAlign="center">
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={4}
        >
          <Typography>{props.children}</Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default ErrorMessage;
