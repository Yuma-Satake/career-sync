import { Box, Button, Container, Stack, Typography } from '@mui/material';
import type { Dayjs } from 'dayjs';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import { useCalenderControl } from './useCalenderControl';
import { CalenderHeader } from './CalenderHeader';

export const TopPage: FC = () => {
  const router = useNavigate();

  const { nowDate, dateArrayByWeek, addMonth, subtractMonth } = useCalenderControl();

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
              router('/auth');
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
              router('/plans');
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
              router('/history');
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

      <CalenderHeader />
      <Stack direction="row" justifyContent="space-between">
        <Button
          variant="contained"
          size="large"
          onClick={subtractMonth}
          sx={{
            bgcolor: 'white',
            color: 'black',
          }}
        >
          ＜
        </Button>

        <Typography variant="h3">{nowDate.format('MM月')}</Typography>

        <Button
          variant="contained"
          size="large"
          onClick={addMonth}
          sx={{
            bgcolor: 'white',
            color: 'black',
          }}
        >
          ＞
        </Button>
      </Stack>
      {
        // カレンダーの表示

        dateArrayByWeek.map((week, index) => (
          <Stack key={index} direction="row">
            {week.map((date, index2) => (
              <Stack
                key={date.format('YYYY-MM-DD')}
                justifyContent="center"
                alignItems="center"
                sx={{
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '1 / 1',
                  bgcolor: 'white',
                  borderBottom: '0.5px solid #666666',
                  borderRight: '0.5px solid #666666',
                  borderTop: index === 0 ? '0.5px solid #666666' : 'none',
                  borderLeft: index2 === 0 ? '0.5px solid #666666' : 'none',
                  padding: '10px',
                }}
              >
                {date.month() === nowDate.month() ? (
                  <Typography>{date.format('D')}</Typography>
                ) : null}
              </Stack>
            ))}
          </Stack>
        ))
      }
    </Container>
  );
};
