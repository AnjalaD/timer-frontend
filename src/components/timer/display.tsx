import { Clock } from "./clock";
import { CountDown } from "./count-down";
import { useSettingsStore } from "./settings-store";
import { useTimerStore } from "./timer-store";

export const Display = () => {
  const time = useTimerStore((state) => state.time);

  const clockVisible = useSettingsStore((state) => state.clockVisible);

  return (
    <div className="flex-[3] flex flex-col justify-center items-center gap-2">
      <CountDown time={time} />
      {clockVisible && <Clock />}
    </div>
  );
};
