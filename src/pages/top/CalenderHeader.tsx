import { Box, Grid } from '@mui/material';
import { Stack } from '@mui/system';
import type { FC } from 'react';

const weekArray = ['日', '月', '火', '水', '木', '金', '土'];

/**
 * カレンダーの曜日の列の表示
 */
export const CalenderHeader: FC = () => {
  return (
    <Grid container justifyContent="center" columns={7} sx={{ bgcolor: 'white' }}>
      {weekArray.map((item) => {
        return (
          <Grid key={item} item xs={1}>
            <Stack alignItems="center">
              <Box sx={{ color: 'black' }}>{item}</Box>
            </Stack>
          </Grid>
        );
      })}
    </Grid>
  );
};
