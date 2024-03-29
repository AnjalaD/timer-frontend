import {
  PauseIcon,
  PlayIcon,
  ResetIcon,
  TimerIcon,
} from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { useTimerStore } from "./timer-store";

export const TimerControls = () => {
  const start = useTimerStore((state) => state.start);
  const pause = useTimerStore((state) => state.pause);
  const reset = useTimerStore((state) => state.reset);
  const set = useTimerStore((state) => state.set);
  const isRunning = useTimerStore((state) => state.isRunning);
  const isComplete = useTimerStore((state) => state.isComplete);

  const [value, setValue] = useState(300);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          type="number"
          min={0}
          disabled={isRunning}
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value))}
        />
        <Button disabled={isRunning} onClick={() => set(value)}>
          <TimerIcon className="mr-2 h-4 w-4" /> Set
        </Button>

        <Button disabled={isRunning} onClick={reset}>
          <ResetIcon className="mr-2 h-4 w-4" /> Reset
        </Button>
      </div>

      {!isRunning && (
        <Button disabled={isComplete} onClick={start}>
          <PlayIcon className="mr-2 h-4 w-4" /> Start
        </Button>
      )}
      {isRunning && (
        <Button onClick={pause}>
          <PauseIcon className="mr-2 h-4 w-4" /> Pause
        </Button>
      )}
    </div>
  );
};
