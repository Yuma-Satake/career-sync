import { Box, Button, Container, IconButton, Stack, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useCalenderControl } from './useCalenderControl';
import { CalenderHeader } from './CalenderHeader';
import { CalendarEvents } from '../CalenderType';

type Props = {
  token: string;
};
export const TopPage: FC<Props> = ({ token }) => {
  const router = useNavigate();
  const [calender, setCalender] = useState<CalendarEvents | null>(null);
  const fetchCalender = async () => {
    const url = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const newcalenderData = await response.json();
    setCalender(newcalenderData);
  };
  useEffect(() => {
    fetchCalender();
  }, [token]);

  const { nowDate, dateArrayByWeek, addMonth, subtractMonth } = useCalenderControl();

  const calenderData = calender?.items ?? [];

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
            <Typography>水曜日</Typography>
            <Typography variant="h3">24</Typography>
          </Box>
          <Button
            variant="contained"
            size="medium"
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
          spacing={2}
        >
          <Button
            variant="text"
            size="small"
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
            アカウント
          </Button>
          <Button
            variant="text"
            size="small"
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
            生成履歴
          </Button>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        spacing={3}
        justifyContent="space-around"
        sx={{
          padding: '20px',
          bgcolor: 'white',
          marginTop: '20px',
          borderRadius: '10px 10px 0 0',
        }}
      >
        <Typography variant="h4">{nowDate.format('MM月')}</Typography>

        <Stack direction="row" spacing={3}>
          <IconButton
            onClick={subtractMonth}
            sx={{
              bgcolor: 'white',
              color: 'black',
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton
            onClick={addMonth}
            sx={{
              bgcolor: 'white',
              color: 'black',
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Stack>
      </Stack>
      <CalenderHeader />

      {
        // カレンダーの表示
        dateArrayByWeek.map((week, index) => (
          <Stack key={index} direction="row">
            {week.map((date, index2) => {
              const todayEvents = calenderData.filter((event) => {
                const eventDate = event.start?.date ?? event.start?.dateTime;
                return eventDate?.includes(date.format('YYYY-MM-DD'));
              });

              //todayEventsの中身を2つに制限をかける
              const limitedEvents = todayEvents.slice(0, 2);

              return (
                <Stack
                  key={date.format('YYYY-MM-DD')}
                  justifyContent="flex-start"
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
                    padding: '1px',
                  }}
                >
                  {date.month() === nowDate.month() ? (
                    <Typography
                      sx={{
                        color: date.day() === 0 ? 'red' : date.day() === 6 ? 'blue' : 'black',
                        fontSize: '0.8rem',
                      }}
                    >
                      {date.format('D')}
                    </Typography>
                  ) : null}

                  {
                    //eventsの日付とカレンダーの日付が一致したら表示

                    limitedEvents.map((event) => {
                      return (
                        <Stack
                          key={event.id}
                          sx={{
                            bgcolor: 'green',
                            borderRadius: '3px',
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: '0.55rem',
                              color: 'white',
                            }}
                          >
                            {event.summary}
                          </Typography>
                        </Stack>
                      );
                    })
                  }
                </Stack>
              );
            })}
          </Stack>
        ))
      }
      <Box
        sx={{
          width: '100%',
          height: '20px',
          borderEndEndRadius: '10px',
          borderEndStartRadius: '10px',
          bgcolor: 'white',
        }}
      />
    </Container>
  );
};
