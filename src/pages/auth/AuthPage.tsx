import { Box, Button, Container, IconButton, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

export const AuthPage: FC = () => {
  const router = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        width: '100%',
        height: '100dvh',
        bgcolor: 'primary.main',
      }}
    >
      <IconButton
        onClick={() => {
          router('/');
        }}
        sx={{
          top: '50px',
          left: '10px',
        }}
      >
        <Box
          sx={{
            bgcolor: 'gray',
            height: '100%',
            width: '100%',
            position: 'absolute',
            zIndex: 1,
          }}
        />
        <ArrowCircleLeftIcon
          sx={{
            width: '50px',
            height: '50px',
            position: 'absolute',
            color: 'white',
            zIndex: 2,
          }}
        />
      </IconButton>
      <Stack
        direction="row"
        spacing={3}
        sx={{
          marginTop: '100px',
          height: '70%',
        }}
      >
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
              }}
            >
              Login
            </Typography>
          </Box>
          <Button
            size="small"
            startIcon={<img src="google.png" />}
            variant="contained"
            onClick={() => {
              router('/generate-plans');
            }}
            sx={{
              color: 'black',
              bgcolor: 'white',
              border: '1px solid black',
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
