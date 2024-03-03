import { TimerControls } from "./timer-controls";
import { Remotes } from "./remotes";
import { Settings } from "./settings";

export const ControlPanel = () => {
  return (
    <div className="flex flex-col gap-6">
      <TimerControls />
      <Settings />
      <Remotes />
    </div>
  );
};
