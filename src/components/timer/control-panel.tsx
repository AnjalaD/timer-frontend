import { UiControls } from "./ui-controls";
import { TimerControls } from "./timer-controls";
import { MusicControls } from "./music-controls";
import { Remotes } from "./remotes";

export const ControlPanel = () => {
  return (
    <div className="flex flex-col gap-4">
      <TimerControls />
      <UiControls />
      <MusicControls />
      <Remotes />
    </div>
  );
};
