import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Settings } from 'lucide-react';
import Timer from './components/Timer';
import TimerHistory from './components/TimerHistory';
import LanguageSelector from './components/LanguageSelector';
import TimerSettings from './components/TimerSettings';
import { TimerType } from './types';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [durations, setDurations] = useState({
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  });
  const [time, setTime] = useState(durations.pomodoro);
  const [timerType, setTimerType] = useState<TimerType>('pomodoro');
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState<{ type: TimerType; duration: number }[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    if (isRunning && time > 0) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (time === 0) {
      setHistory((prevHistory) => [...prevHistory, { type: timerType, duration: durations[timerType] }]);
      setIsRunning(false);
    }
  }, [isRunning, time, timerType, durations]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleTimerTypeChange = (type: TimerType) => {
    setTimerType(type);
    setTime(durations[type]);
    setIsRunning(false);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTime(durations[timerType]);
    setIsRunning(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const updateDuration = (type: TimerType, minutes: number) => {
    setDurations((prev) => ({ ...prev, [type]: minutes * 60 }));
    if (type === timerType) {
      setTime(minutes * 60);
    }
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat(i18n.language, {
      dateStyle: 'full',
      timeStyle: 'medium',
    }).format(date);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen transition-colors duration-300">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">{t('appTitle')}</h1>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <button onClick={() => setShowSettings(true)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <Settings size={24} />
              </button>
              <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>
            </div>
          </div>
          <div className="text-center mb-4">
            <p>{formatDateTime(currentDateTime)}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <div className="flex justify-between mb-6">
              {(['pomodoro', 'shortBreak', 'longBreak'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => handleTimerTypeChange(type)}
                  className={`px-4 py-2 rounded ${
                    timerType === type ? 'bg-indigo-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
                  }`}
                >
                  {t(type)}
                </button>
              ))}
            </div>
            <Timer time={time} />
            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={toggleTimer}
                className="px-6 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
              >
                {isRunning ? t('pause') : t('start')}
              </button>
              <button
                onClick={resetTimer}
                className="px-6 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
              >
                {t('reset')}
              </button>
            </div>
          </div>
          <TimerHistory history={history} />
        </div>
      </div>
      {showSettings && (
        <TimerSettings
          durations={durations}
          updateDuration={updateDuration}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
};

export default App;