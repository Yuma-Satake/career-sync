import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';

export const TopPage: FC = () => {
  const router = useNavigate();

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
            <Typography variant="h2">14</Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            endIcon={<ExitToAppIcon />}
            onClick={() => {
              router('/generate-plans');
            }}
            sx={{
              color: 'white',
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
            borderRadius: '10px',
            padding: '20px',
          }}
          spacing={5}
        >
          <Button
            variant="text"
            size="large"
            startIcon={<AccountCircleIcon />}
            onClick={() => {
              router('/auth-page');
            }}
            sx={{
              color: 'black',
              // ボタンに影を付ける
              boxShadow: '3px 3px 10px 0px rgba(0,0,0,0.75)',
            }}
          >
            アカウント設定
          </Button>
          <Button
            variant="text"
            size="large"
            startIcon={<SettingsIcon />}
            onClick={() => {
              router('/plans-page');
            }}
            sx={{
              color: 'black',
              // ボタンに影を付ける
              boxShadow: '3px 3px 10px 0px rgba(0,0,0,0.75)',
            }}
          >
            日程時間設定
          </Button>
          <Button
            variant="text"
            size="large"
            startIcon={<HistoryIcon />}
            onClick={() => {
              router('/history-page');
            }}
            sx={{
              color: 'black',
              // ボタンに影を付ける
              boxShadow: '3px 3px 10px 0px rgba(0,0,0,0.75)',
            }}
          >
            日付生成履歴
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};
