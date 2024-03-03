import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type SettingsStore = {
  clockVisible: boolean;
  toggleClock: () => void;
  musicEnabled: boolean;
  toggleMusic: () => void;
};

export const useSettingsStore = create<SettingsStore>()(
  devtools(
    persist(
      immer((set) => ({
        clockVisible: true,
        toggleClock: () =>
          set((state) => {
            state.clockVisible = !state.clockVisible;
          }),
        musicEnabled: true,
        toggleMusic: () =>
          set((state) => {
            state.musicEnabled = !state.musicEnabled;
          }),
      })),
      { name: "settings" }
    )
  )
);
