import { FC } from 'react';

export const HistoryPage: FC = () => {
  const history = [
    {
      text: 'aaaaa',
      date: '2021-10-01',
    },
    {
      text: 'bbbbb',
      date: '2021-10-02',
    },
    {
      text: 'ccccc',
      date: '2021-10-03',
    },
    {
      text: 'ddddd',
      date: '2021-10-04',
    },
    {
      text: 'eeeee',
      date: '2021-10-05',
    },
  ];

  return (
    <div>
      HistoryPage
      <div>
        {history.map((item) => {
          return (
            <div key={item.date}>
              <div>{item.text}</div>
              <div>{item.date}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
