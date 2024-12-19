import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  MenuItem,
  IconButton,
  Snackbar,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { json, useNavigate } from 'react-router-dom';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import dayjs from 'dayjs';
import { History, HistoryLog, HistoryLogArray } from '../history/HistoryPage';

// カレンダーイベントの型定義
type CalendarEvent = {
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
};

// コンポーネントに渡されるプロパティの型定義
type Props = {
  token: string;
};

// 曜日の配列
const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];

// 00:00から23:59までの時間オプションを生成する関数
const generateMinuteOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute++) {
      options.push(`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
    }
  }
  return options;
};

// メインのコンポーネント
export const GeneratePlansPage: FC<Props> = ({ token }) => {
  const router = useNavigate(); // ナビゲーション用のフック
  const [calender, setCalender] = useState<{ items: CalendarEvent[] } | null>(null); // カレンダーのデータ
  const [startDate, setStartDate] = useState<string>(dayjs().format('YYYY-MM-DD')); // 開始日
  const [endDate, setEndDate] = useState<string>(dayjs().add(7, 'day').format('YYYY-MM-DD')); // 終了日
  const [selectedDays, setSelectedDays] = useState<boolean[]>([
    false,
    true,
    true,
    true,
    true,
    true,
    false,
  ]); // 選択された曜日
  const [dayTimes, setDayTimes] = useState<{ start: string; end: string }[]>(
    Array(7).fill({ start: '09:00', end: '17:00' })
  ); // 曜日ごとの開始時間と終了時間
  const [availableHoursInRange, setAvailableHoursInRange] = useState<
    { date: string; hours: string[] }[]
  >([]); // 利用可能な時間帯
  const [hasGenerated, setHasGenerated] = useState<boolean>(false); // 候補が生成されたかどうか
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // エラーメッセージ

  // コンポーネントの初回レンダリング時にカレンダーのデータをフェッチ
  useEffect(() => {
    const fetchCalender = async () => {
      const url = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';
      const response = await fetch(url, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }, // トークンを使って認証
      });
      const newCalenderData = await response.json();
      setCalender(newCalenderData); // フェッチしたデータをステートに保存
    };

    fetchCalender();
  }, [token]); // トークンが変更されたときに再フェッチ

  const calenderData = calender?.items ?? []; // カレンダーのイベントデータ

  // 利用可能な分を計算する関数
  const getAvailableMinutes = (date: any, startTime: string, endTime: string) => {
    const minutes: string[] = [];
    const dayStart = date
      .startOf('day')
      .hour(parseInt(startTime.split(':')[0]))
      .minute(0); // 開始時間を設定
    const dayEnd = date
      .startOf('day')
      .hour(parseInt(endTime.split(':')[0]))
      .minute(0); // 終了時間を設定

    for (
      let time = dayStart;
      time.isBefore(dayEnd.add(1, 'minute'));
      time = time.add(1, 'minute')
    ) {
      const hourStart = time.format(); // 現在の時間をフォーマット
      const hourEnd = time.add(1, 'minute').format(); // 次の分をフォーマット

      // カレンダーにイベントがあるか確認
      const hasEvent = calenderData.some((event: CalendarEvent) => {
        const eventStart = event.start?.dateTime || event.start?.date;
        const eventEnd = event.end?.dateTime || event.end?.date;

        if (!eventStart || !eventEnd) return false;

        // イベントの時間が重なっているかを判定
        return (
          (eventStart >= hourStart && eventStart < hourEnd) ||
          (eventEnd > hourStart && eventEnd <= hourEnd) ||
          (eventStart < hourStart && eventEnd > hourEnd)
        );
      });

      if (!hasEvent) minutes.push(time.format('HH:mm')); // イベントがなければ利用可能な時間として追加
    }

    return minutes;
  };

  // 指定された範囲内の利用可能な時間を計算
  const calculateAvailableHoursInRange = () => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const availableHours: { date: string; hours: string[] }[] = [];

    for (let date = start; date.isBefore(end.add(1, 'day')); date = date.add(1, 'day')) {
      const dayOfWeek = date.day(); // 曜日を取得
      if (!selectedDays[dayOfWeek]) continue; // 選択されていない曜日はスキップ

      const { start: dayStartTime, end: dayEndTime } = dayTimes[dayOfWeek]; // 曜日ごとの時間を取得
      const availableMinutes = getAvailableMinutes(date, dayStartTime, dayEndTime); // 利用可能な分を取得
      if (availableMinutes.length > 0) {
        const formattedHours = formatAvailableHours(availableMinutes); // 分をフォーマット
        availableHours.push({ date: date.format('YYYY-MM-DD'), hours: formattedHours }); // 結果を追加
      }
    }

    const item = localStorage.getItem('careery-sync-history');
    const oldHistory: HistoryLogArray | null = item ? JSON.parse(item) : null;

    console.log(oldHistory);

    if (!oldHistory) {
      localStorage.setItem(
        'careery-sync-history',
        JSON.stringify({
          historyLog: [{ history: availableHours, memo: customMessage }],
        })
      );
      return;
    }

    const newHistory: HistoryLogArray = {
      historyLog: [...oldHistory.historyLog, { history: availableHours, memo: customMessage }],
    };

    console.log(newHistory);

    localStorage.setItem('careery-sync-history', JSON.stringify(newHistory));

    setAvailableHoursInRange(availableHours); // 最終的な利用可能時間をステートに保存
    setHasGenerated(true); // 候補が生成されたことを記録
  };

  // 利用可能な分をフォーマットする関数
  const formatAvailableHours = (minutes: string[]) => {
    const formatted: string[] = [];
    let start: string | null = null;

    for (let i = 0; i < minutes.length; i++) {
      const currentMinute = minutes[i];
      if (!start) start = currentMinute; // 開始時間を設定

      const nextMinute = minutes[i + 1];
      const isConsecutive =
        nextMinute &&
        parseInt(nextMinute.split(':')[0]) === parseInt(currentMinute.split(':')[0]) &&
        parseInt(nextMinute.split(':')[1]) === (parseInt(currentMinute.split(':')[1]) + 1) % 60;

      if (isConsecutive) continue; // 連続している場合はスキップ

      if (start === currentMinute) {
        formatted.push(start); // 1分だけの場合
      } else {
        formatted.push(`${start}~${currentMinute}`); // 範囲をフォーマット
      }
      start = null; // 開始時間をリセット
    }

    return formatted; // フォーマット済みの時間を返す
  };

  // 曜日の選択を切り替える関数
  const handleDayChange = (index: number) => {
    setSelectedDays((prev) => {
      const newDays = [...prev];
      newDays[index] = !newDays[index]; // 選択状態を反転
      return newDays;
    });
  };

  // 曜日ごとの時間設定を変更する関数
  const handleTimeChange = (index: number, type: 'start' | 'end', value: string) => {
    setDayTimes((prev) => {
      const newTimes = [...prev];
      newTimes[index] = { ...newTimes[index], [type]: value }; // 時間を更新

      // 開始時間が終了時間よりも後ろの場合のエラーチェック
      const startTime = newTimes[index].start;
      const endTime = newTimes[index].end;

      if (
        startTime &&
        endTime &&
        dayjs(`1970-01-01T${startTime}`) > dayjs(`1970-01-01T${endTime}`)
      ) {
        setErrorMessage('開始時刻は終了時刻よりも前に設定してください。');
      } else {
        setErrorMessage(null); // エラーがなければエラーメッセージをクリア
      }

      return newTimes;
    });
  };

  // 開始日を変更する際のエラーチェック
  const handleStartDateChange = (date: string) => {
    setStartDate(date);
    if (dayjs(date).isAfter(endDate)) {
      setErrorMessage('開始日は終了日よりも前に設定してください。');
    } else {
      setErrorMessage(null);
    }
  };

  // 終了日を変更する際のエラーチェック
  const handleEndDateChange = (date: string) => {
    setEndDate(date);
    if (dayjs(date).isBefore(startDate)) {
      setErrorMessage('終了日は開始日よりも後に設定してください。');
    } else {
      setErrorMessage(null);
    }
  };

  // テキストをクリップボードにコピーする関数
  const [customMessage, setCustomMessage] = useState<string>(''); // ユーザー入力メッセージ
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('コピーしました'); // コピー成功のアラート
    });
  };

  // 全ての利用可能時間をコピーする関数
  const copyAllAvailableHours = () => {
    const allAvailableHours = availableHoursInRange
      .map(({ date, hours }) => {
        const dayOfWeekIndex = dayjs(date).day();
        const dayOfWeek = daysOfWeek[dayOfWeekIndex]; // 曜日を取得
        return `${dayjs(date).format('YYYY年MM月DD日')} (${dayOfWeek}曜日): ${hours.join(', ')}`;
      })
      .join('\n');

    // ユーザーのカスタムメッセージを最初に追加
    copyToClipboard(customMessage + '\n' + allAvailableHours); // クリップボードにコピー
  };

  return (
    <Container maxWidth="sm" sx={{ height: '100vh', bgcolor: 'primary.main', padding: '0 16px' }}>
      <IconButton onClick={() => router('/')} sx={{ top: '50px', left: '10px' }}>
        <Box
          sx={{ bgcolor: 'gray', height: '100%', width: '100%', position: 'absolute', zIndex: 1 }}
        />
        <ArrowCircleLeftIcon
          sx={{ width: '50px', height: '50px', position: 'absolute', color: 'white', zIndex: 2 }}
        />
      </IconButton>

      <Stack direction="column" spacing={1} sx={{ marginTop: '100px', flexGrow: 1 }}>
        <Stack justifyContent="space-between" spacing={1}>
          <Stack
            spacing={1}
            sx={{ width: '100%', bgcolor: 'white', borderRadius: '10px', padding: '10px' }}
          >
            <Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                <Typography sx={{ marginBottom: 1 }}>期間指定</Typography>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ width: '100%', marginTop: 1 }}>
                <TextField
                  label="開始日"
                  type="date"
                  value={startDate}
                  onChange={(e) => handleStartDateChange(e.target.value)} // 開始日を更新
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    height: '35px',
                    width: '100%',
                    '& .MuiInputBase-root': { height: '100%' },
                  }}
                />
                <TextField
                  label="終了日"
                  type="date"
                  value={endDate}
                  onChange={(e) => handleEndDateChange(e.target.value)} // 終了日を更新
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    height: '35px',
                    width: '100%',
                    '& .MuiInputBase-root': { height: '100%' },
                  }}
                />
              </Stack>
            </Box>

            <Box sx={{ marginBottom: 1 }}>
              <Typography>曜日指定</Typography>
              {daysOfWeek.map((day, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedDays[index]} // 曜日選択状態
                        onChange={() => handleDayChange(index)} // 曜日を切り替える
                      />
                    }
                    label={day}
                  />
                  <Stack direction="row" spacing={1} width={'100%'}>
                    <TextField
                      label="開始時間"
                      type="time"
                      value={dayTimes[index].start} // 開始時間
                      onChange={(e) => handleTimeChange(index, 'start', e.target.value)} // 開始時間を変更
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        height: '35px',
                        width: '100%',
                        '& .MuiInputBase-root': { height: '100%' },
                      }}
                    >
                      {generateMinuteOptions().map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      label="終了時間"
                      type="time"
                      value={dayTimes[index].end} // 終了時間
                      onChange={(e) => handleTimeChange(index, 'end', e.target.value)} // 終了時間を変更
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        height: '35px',
                        width: '100%',
                        '& .MuiInputBase-root': { height: '100%' },
                      }}
                    >
                      {generateMinuteOptions().map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>
                </Box>
              ))}
            </Box>

            <Button
              variant="contained"
              size="medium"
              onClick={calculateAvailableHoursInRange} // 利用可能時間を計算
              sx={{ color: 'white' }}
            >
              候補生成
            </Button>
          </Stack>

          <Stack
            justifyContent="space-between"
            sx={{ width: '100%', bgcolor: 'white', borderRadius: '10px', padding: '16px' }}
          >
            <Box
              sx={{
                paddingBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="subtitle1" sx={{ fontSize: '0.8rem' }}>
                空いている時間
              </Typography>
              <TextField
                label="memo"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)} // メッセージを更新
                variant="outlined"
                fullWidth
                sx={{
                  height: '35px',
                  width: '50%',
                  '& .MuiInputBase-root': { height: '120%' },
                }}
              />
              {hasGenerated && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={copyAllAvailableHours} // 利用可能時間をコピー
                  sx={{
                    height: '30px',
                    width: '10%',
                  }}
                >
                  コピー
                </Button>
              )}
            </Box>
            <Box
              sx={{
                maxHeight: '100px',
                overflowY: 'auto',
                padding: '5px',
                bgcolor: 'lightgray',
                borderRadius: '5px',
              }}
            >
              <Stack spacing={1}>
                {availableHoursInRange.map(({ date, hours }) => {
                  const availableHoursString = hours.join(', ');
                  const dayOfWeekIndex = dayjs(date).day();
                  const dayOfWeek = daysOfWeek[dayOfWeekIndex]; // 曜日を取得

                  return (
                    <Stack
                      key={date}
                      sx={{
                        bgcolor: 'white',
                        borderRadius: '3px',
                        padding: '4px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography sx={{ fontSize: '0.8rem', color: 'black' }}>
                        {dayjs(date).format('YYYY年MM月DD日')} ({dayOfWeek}曜日) :{' '}
                        {availableHoursString}
                      </Typography>
                    </Stack>
                  );
                })}
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Stack>

      {/* エラーメッセージの表示 */}
      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={6000}
        onClose={() => setErrorMessage(null)}
        message={errorMessage}
      />
    </Container>
  );
};
