import { createContext, useContext, useEffect, useState } from "react";

export type TimerContextType = {
  time: number;
  isRunning: boolean;
  isComplete: boolean;
  set: (time: number) => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
};

const TimerContext = createContext<TimerContextType>({
  time: 0,
  isRunning: false,
  isComplete: false,
  set: () => {},
  start: () => {},
  pause: () => {},
  reset: () => {},
});

export const useTimerContext = () => useContext(TimerContext);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        if (time === 0) {
          setIsComplete(true);
          setIsRunning(false);
          return;
        }

        setTime((time) => time - 1);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [isRunning, time]);

  const set = (time: number) => {
    setTime(time);
  };

  const start = () => {
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <TimerContext.Provider
      value={{
        time,
        isRunning,
        isComplete,
        set,
        start,
        pause,
        reset,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
