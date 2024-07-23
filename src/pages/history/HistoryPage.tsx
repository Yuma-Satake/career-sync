import { FC } from 'react';
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
            height: '100%',
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
          pt: 18,
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
          <Stack
            sx={{
              width: '60%',
              height: '30dvh',
              bgcolor: '#C0C0C0',
            }}
          >
            <Stack
              sx={{
                p: 2,
                border: 1,
              }}
            >
              年月日
            </Stack>
          </Stack>
          <Stack
            sx={{
              width: '40%',
              height: '30dvh',
              bgcolor: '#C0C0C0',
            }}
          >
            <Stack
              sx={{
                p: 2,
                border: 1,
                borderLeft: 0,
              }}
            >
              メモ
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
//真ん中に寄せる
//中身を持ってきて表示
//グレー薄めて線追加
//文字のでかさとレイアウト
