import { FC, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TopPage } from '../pages/top/TopPage';
import { AuthPage } from '../pages/auth/AuthPage';
import { GeneratePlansPage } from '../pages/generate-plans/GeneratePlansPage';
import { PlansPage } from '../pages/plans/PlansPage';
import { HistoryPage } from '../pages/history/HistoryPage';
import { CalendarType } from '../pages/auth/CalendarType';

export const RouterProvider: FC = () => {
  const [calendar, setCalendar] = useState<CalendarType | null>(null);
  console.log(calendar);

  const routes = [
    {
      path: '/',
      element: <TopPage calendar={calendar} />,
    },
    {
      path: '/auth',
      element: <AuthPage setCalendar={setCalendar} />,
    },
    {
      path: '/generate-plans',
      element: <GeneratePlansPage />,
    },
    {
      path: '/plans',
      element: <PlansPage />,
    },
    {
      path: '/history',
      element: <HistoryPage />,
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => {
          return <Route key={route.path} path={route.path} element={route.element} />;
        })}
      </Routes>
    </BrowserRouter>
  );
};
