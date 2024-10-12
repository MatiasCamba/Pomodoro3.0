import React from 'react';
import { useTranslation } from 'react-i18next';
import { TimerType } from '../types';

interface TimerSettingsProps {
  durations: { [key in TimerType]: number };
  updateDuration: (type: TimerType, minutes: number) => void;
  onClose: () => void;
}

const TimerSettings: React.FC<TimerSettingsProps> = ({ durations, updateDuration, onClose }) => {
  const { t } = useTranslation();

  const handleInputChange = (type: TimerType, value: string) => {
    const minutes = parseInt(value, 10);
    if (!isNaN(minutes) && minutes > 0) {
      updateDuration(type, minutes);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">{t('timerSettings')}</h2>
        <div className="space-y-4">
          {Object.entries(durations).map(([type, duration]) => (
            <div key={type} className="flex items-center justify-between">
              <label htmlFor={type} className="font-semibold dark:text-white">
                {t(type as TimerType)}:
              </label>
              <input
                type="number"
                id={type}
                value={Math.floor(duration / 60)}
                onChange={(e) => handleInputChange(type as TimerType, e.target.value)}
                className="border rounded px-2 py-1 w-20 text-right dark:bg-gray-700 dark:text-white"
                min="1"
              />
              <span className="ml-2 dark:text-white">{t('minutes')}</span>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-6 bg-indigo-500 text-white px-4 py-2 rounded-full w-full hover:bg-indigo-600"
        >
          {t('close')}
        </button>
      </div>
    </div>
  );
};

export default TimerSettings;