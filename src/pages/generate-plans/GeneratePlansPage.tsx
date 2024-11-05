import { FC, useState } from 'react';
import { Container, Stack, Typography, IconButton, Input, Button, Box } from '@mui/material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useNavigate } from 'react-router-dom';

export const GeneratePlansPage: FC = () => {
  const router = useNavigate();
  const dayOfWeek = ['月', '火', '水', '木', '金', '土', '日'];
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const generatePlans = () => {
    if (!startDate || !endDate) {
      alert('期間を指定してください');
      return;
    }
    router('/plans');
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        width: '100%',
        height: '100vh',
        bgcolor: 'primary.main',
      }}
    >
      {/* 戻るボタン */}
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
        direction="column"
        spacing={3}
        sx={{
          marginTop: '100px',
          height: 'auto',
        }}
      >
        <Stack
          justifyContent="space-between"
          spacing={3}
          sx={{
            height: 'auto',
          }}
        >
          {/* 期間 */}
          <Stack
            direction="column"
            spacing={3}
            sx={{
              width: '100%',
              height: 'auto',
              bgcolor: 'white',
              borderRadius: '10px',
              padding: '10px',
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-around">
              {'期間'}
              <Input
                type="date"
                id="startDate"
                name="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{
                  width: '35%',
                  padding: '2px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                }}
              />
              {'～'}
              <Input
                type="date"
                id="endDate"
                name="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{
                  width: '35%',
                  padding: '2px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                }}
              />
            </Stack>
          </Stack>

          {/* 曜日と時間帯 */}
          <Stack
            direction="column"
            alignItems="stretch"
            justifyContent="space-between"
            spacing={3}
            sx={{
              width: '100%',
              height: 'auto',
              bgcolor: 'white',
              borderRadius: '10px',
              padding: '5px',
            }}
          >
            {dayOfWeek.map((day) => (
              <Typography key={day}>
                <input type="checkbox" /> {day}{' '}
                <Input
                  type="time"
                  id={`startTime-${day}`}
                  style={{
                    width: '40%',
                    padding: '2px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    margin: 'auto',
                  }}
                />
                {' ～ '}
                <Input
                  type="time"
                  id={`endTime-${day}`}
                  style={{
                    width: '40%',
                    padding: '2px',
                    marginBottom: '3px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                />
              </Typography>
            ))}
          </Stack>

          {/* メモ入力と生成ボタン */}
          <Input
            type="text"
            style={{
              textAlign: 'center',
              width: '100%',
              padding: '10px',
              fontSize: '15px',
              backgroundColor: 'white',
              borderRadius: '10px',
            }}
            placeholder="メモ"
          />

          <Stack direction="row" justifyContent="end">
            <Button
              style={{
                width: '25%',
                fontSize: '15px',
                backgroundColor: 'white',
                borderRadius: '10px',
              }}
              variant="contained"
              onClick={generatePlans}
            >
              生成
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
