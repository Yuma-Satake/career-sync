import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';

export const AuthPage: FC = () => {
  const router = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        width: '100%',
        height: '100dvh',
        bgcolor: 'primary.main',
        padding: '70px',
      }}
    >
      <Stack direction="row" spacing={3}>
        <Stack
          justifyContent="center"
          spacing={5}
          sx={{
            width: '100%',
            height: 'auto',
            aspectRatio: '1 / 1',
            bgcolor: 'white',
            borderRadius: '10px',
            padding: '20px',
          }}
        >
          <Box>
            <Typography
              sx={{
                textAlign: 'center',
                fontFamily: 'arial',
                fontSize: '50px',
                fontWeight: 'bold',
                // padding: '50px',
              }}
            >
              Login
            </Typography>
          </Box>
          <Button
            startIcon={<img src="google.png" />}
            variant="contained"
            onClick={() => {
              router('/generate-plans');
            }}
            sx={{
              color: 'black',
              bgcolor: 'white',
              border: '1px solid black',
              width: '500px',
              height: '70px',
              fontWeight: 'bold',
            }}
          >
            Google
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};
