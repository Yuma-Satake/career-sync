import { FC, useState } from 'react';
import * as React from 'react';
import {
  Button,
  Menu,
  MenuItem,
  Fade,
  Container,
  Stack,
  IconButton,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import dayjs from 'dayjs';

export type History = {
  date: string;
  hours: string[];
};

export type HistoryLog = {
  memo: string;
  history: History[];
};

export type HistoryLogArray = {
  historyLog: HistoryLog[];
};

export const HistoryPage: FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const router = useNavigate();

  const [historyLogArray, setHistoryLog] = React.useState<HistoryLogArray | null>(null);

  React.useEffect(() => {
    const historyLogData = localStorage.getItem('careery-sync-history');
    if (!historyLogData) return;
    const historyLogArray: HistoryLogArray = JSON.parse(historyLogData);
    setHistoryLog(historyLogArray);
  }, []);

  const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
  // テキストをクリップボードにコピーする関数
  const [customMessage] = useState<string>(''); // ユーザー入力メッセージ
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('コピーしました'); // コピー成功のアラート
    });
  };
  // 全ての利用可能時間をコピーする関数
  const copyAllAvailableHours = (historyLog: HistoryLog) => {
    const allAvailableHours = historyLog.history
      .map(({ date, hours }) => {
        const dayOfWeekIndex = dayjs(date).day();
        const dayOfWeek = daysOfWeek[dayOfWeekIndex]; // 曜日を取得
        return `${dayjs(date).format('YYYY年MM月DD日')} (${dayOfWeek}曜日): ${hours.join(', ')}`;
      })
      .join('\n');
    copyToClipboard(customMessage + '\n' + allAvailableHours); // クリップボードにコピー
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        width: '100%',
        height: '100dvh',
        bgcolor: 'primary.main',
        padding: '5px',
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
        <Stack
          sx={{
            bgcolor: 'gray',
            height: '10%',
            width: '100%',
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
      <Typography
        fontSize={25}
        sx={{
          pt: 12,
          color: 'white',
        }}
      >
        年月選択
      </Typography>
      <Stack direction="row" spacing={12} alignItems="stretch" sx={{ pt: 2 }}>
        <Button
          variant="contained"
          id="fade-button"
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            backgroundColor: 'white',
          }}
        >
          2023年
        </Button>
        <Button
          variant="contained"
          id="fade-button"
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            backgroundColor: 'white',
          }}
        >
          6月
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleClose}>a</MenuItem>
          <MenuItem onClick={handleClose}>i</MenuItem>
          <MenuItem onClick={handleClose}>u</MenuItem>
        </Menu>
      </Stack>
      <Typography
        fontSize={25}
        sx={{
          pt: 3,
          color: 'white',
        }}
      >
        生成履歴
      </Typography>
      <Stack
        spacing={12}
        alignItems="stretch"
        sx={{
          width: '100%',
          height: '50dvh',
          padding: '20px',
          bgcolor: 'white',
          borderRadius: '10px',
          fontSize: '27px',
        }}
      >
        2023年 6月
        <Stack
          direction={'row'}
          sx={{ width: '100%', bgcolor: '#C0C0C0', borderRadius: '10px', fontSize: '18px' }}
        >
          <Stack>
            {historyLogArray?.historyLog.map((historyLog) => (
              <Stack spacing={1}>
                <Typography variant="h5">{historyLog.memo}</Typography>
                {historyLog.history.map((item) => {
                  return (
                    <Stack>
                      <Typography>日付：{item.date}</Typography>
                      <Stack direction="row" spacing={1}>
                        {item.hours.slice(0, 3).map((hour) => {
                          return <Typography>{hour} / </Typography>;
                        })}
                      </Stack>
                    </Stack>
                  );
                })}
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    copyAllAvailableHours(historyLog);
                  }}
                  sx={{
                    height: '30px',
                    width: '10%',
                  }}
                >
                  コピー
                </Button>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
