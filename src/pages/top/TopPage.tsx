import { Button } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const TopPage: FC = () => {
  const router = useNavigate();

  const navigate = [
    {
      path: '/',
      text: 'TopPage',
    },
    {
      path: '/auth',
      text: 'AuthPage',
    },
    {
      path: '/generate-plans',
      text: 'GeneratePlansPage',
    },
    {
      path: '/plans',
      text: 'PlansPage',
    },
    {
      path: '/history',
      text: 'HistoryPage',
    },
  ];

  return (
    <div>
      TopPage
      {navigate.map((nav) => {
        return (
          <Button
            key={nav.path}
            variant="contained"
            onClick={() => {
              router(nav.path);
            }}
          >
            {nav.text}
          </Button>
        );
      })}
    </div>
  );
};
