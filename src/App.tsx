import AddReactionIcon from '@mui/icons-material/AddReaction';
import XIcon from '@mui/icons-material/X';
import { Button, Stack } from '@mui/material';

function App() {
  const buttonLabelArray = [
    'ホーム',
    '話題を検索',
    '通知',
    'メッセージ',
    'Grok',
    'プレミアム',
    'リスト',
    'ブックマーク',
    'コミュニティ',
    '認証済み組織',
    'プロフィール',
    'もっと見る',
  ];

  return (
    <Stack
      sx={{
        padding: 2,
      }}
    >
      <XIcon />
      <AddReactionIcon />
      {buttonLabelArray.map((item) => {
        return <Button key={item}>{item}</Button>;
      })}
    </Stack>
  );
}

export default App;
