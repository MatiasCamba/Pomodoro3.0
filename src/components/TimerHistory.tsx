import React from 'react';
import { useTranslation } from 'react-i18next';
import { TimerType } from '../types';

interface TimerHistoryProps {
  history: { type: TimerType; duration: number }[];
}

const TimerHistory: React.FC<TimerHistoryProps> = ({ history }) => {
  const { t } = useTranslation();

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} ${t('minutes')}`;
  };

  const getTypeColor = (type: TimerType): string => {
    switch (type) {
      case 'pomodoro':
        return 'text-red-500 dark:text-red-400';
      case 'shortBreak':
        return 'text-green-500 dark:text-green-400';
      case 'longBreak':
        return 'text-blue-500 dark:text-blue-400';
    }
  };

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{t('timerHistory')}</h2>
      {history.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">{t('noHistory')}</p>
      ) : (
        <ul className="space-y-2">
          {history.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <span className={`font-semibold ${getTypeColor(item.type)}`}>
                {t(item.type)}
              </span>
              <span className="text-gray-600 dark:text-gray-300">{formatDuration(item.duration)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TimerHistory;