import { FC, useState } from 'react';
import * as React from 'react';
import { Button, Container, Stack, IconButton, Typography } from '@mui/material';
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

  console.log(historyLogArray?.historyLog);
  console.log(historyLogArray?.historyLog.reverse());

  const handleScroll = () => {
    // スクロール時の処理を記述する
    console.log('スクロールされました');
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
          pt: 15,
          color: 'white',
        }}
      >
        生成履歴
      </Typography>
      <Stack
        spacing={30}
        alignItems="stretch"
        sx={{
          width: '100%',
          height: '60dvh',
          padding: '20px',
          bgcolor: 'white',
          borderRadius: '10px',
          fontSize: '27px',
        }}
      >
        <Stack direction={'row'} sx={{ width: '100%', borderRadius: '10px', fontSize: '18px' }}>
          <div
            onScroll={handleScroll}
            style={{ overflowY: 'scroll', height: '500px', width: '500px' }}
          >
            <Stack>
              {historyLogArray?.historyLog
                .slice()
                .reverse()
                .map((historyLog, index) => (
                  <Stack spacing={1} key={index}>
                    <Typography variant="h5">
                      {historyLog.memo}&nbsp;
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
                    </Typography>
                    {historyLog.history.map((item) => {
                      return (
                        <Stack key={item.date}>
                          <Typography>日付：{item.date}</Typography>
                          <Stack direction="row" spacing={1}>
                            {item.hours.slice(0, 3).map((hour) => {
                              return <Typography key={hour}>{hour} / </Typography>;
                            })}
                            ...
                          </Stack>
                        </Stack>
                      );
                    })}
                    <Typography>-----------------------------</Typography>
                  </Stack>
                ))}
            </Stack>
          </div>
        </Stack>
      </Stack>
    </Container>
  );
};
