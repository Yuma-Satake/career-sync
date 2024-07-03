import { Box, Button, Container, IconButton, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const AuthPage: FC = () => {
  const router = useNavigate();

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/calendar.readonly');
    const auth = getAuth();
    auth.languageCode = 'it';
    provider.setCustomParameters({
      login_hint: 'user@example.com',
    });

    signInWithPopup(auth, provider).then((result) => {
      if (result === null) return;
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential === null) return;

      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      console.log(token);

      if (token !== null) {
        router('/');
      }
    });
  };

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
            startIcon={<img src="google.png" alt="google" />}
            variant="contained"
            onClick={() => {
              googleLogin();
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
