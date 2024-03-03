import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type TimerStore = {
  time: number;
  isRunning: boolean;
  isComplete: boolean;
  set: (time: number) => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
};

export const useTimerStore = create<TimerStore>()(
  devtools(
    immer((set, get) => ({
      time: 300,
      isRunning: false,
      isComplete: false,
      set: (time: number) =>
        set((state) => {
          state.time = time;
        }),
      start: () =>
        set((state) => {
          if (state.time === 0 || state.isRunning === true) return;

          state.isRunning = true;
          const interval = setInterval(() => {
            set((state) => {
              if (get().isRunning === false) {
                clearInterval(interval);
                return;
              }

              if (get().time === 0) {
                state.isComplete = true;
                state.isRunning = false;
                clearInterval(interval);
                return;
              }

              state.time -= 1;
            });
          }, 1000);
        }),
      pause: () =>
        set((state) => {
          state.isRunning = false;
        }),
      reset: () =>
        set((state) => {
          state.time = 0;
          state.isRunning = false;
        }),
    }))
  )
);
