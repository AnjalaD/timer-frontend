import { Clock } from "./clock";
import { CountDown } from "./count-down";
import { useTimerContext } from "./timer-provider";
import { useUiContext } from "./ui-provider";

export const Display = () => {
  const { time } = useTimerContext();

  const { isClockVisible } = useUiContext();

  return (
    <div className="flex-[3] flex flex-col justify-center items-center gap-2">
      <CountDown time={time} />
      {isClockVisible && <Clock />}
    </div>
  );
};
