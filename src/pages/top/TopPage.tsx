import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export const TopPage: FC = () => {
  const router = useNavigate();

  const navigate = [
    {
      path: '/',
      text: 'TopPage',
    },
    {
      path: '/auth',
      text: 'AuthPage',
    },
    {
      path: '/generate-plans',
      text: 'GeneratePlansPage',
    },
    {
      path: '/plans',
      text: 'PlansPage',
    },
    {
      path: '/history',
      text: 'HistoryPage',
    },
  ];

  return (
    <Container
      maxWidth="sm"
      sx={{
        width: '100%',
        height: '100dvh',
        bgcolor: 'primary.main',
        padding: '20px',
      }}
    >
      {/* TopPage
      {navigate.map((nav) => {
        return (
          <Button
            key={nav.path}
            variant="contained"
            onClick={() => {
              router(nav.path);
            }}
          >
            {nav.text}
          </Button>
        );
      })} */}
      {/* こっから始めるぜ */}
      <Stack direction="row" spacing={3}>
        <Stack
          justifyContent="space-between"
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
            <Typography>日曜日</Typography>
            <Typography variant="h3">14</Typography>
          </Box>
          <Button
            variant="contained"
            endIcon={<ExitToAppIcon />}
            onClick={() => {
              router('/generate-plans');
            }}
          >
            候補生成
          </Button>
        </Stack>
        <Stack
          sx={{
            width: '100%',
            height: 'auto',
            aspectRatio: '1 / 1',
            bgcolor: 'white',
          }}
        >
          <Typography>日曜日</Typography>
          <Typography variant="h3">14</Typography>
          <Button variant="contained" endIcon={<ExitToAppIcon />}>
            候補生成
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};
