import { Checkbox } from "../ui/checkbox";
import { useTimerContext } from "./timer-provider";
import { useEffect, useState } from "react";

import tick from "../../assets/sounds/tick.mp3";

export const MusicControls = () => {
  const { isRunning } = useTimerContext();

  const [canPlayMusic, setCanPlayMusic] = useState(true);

  const playMusic = () => {
    setCanPlayMusic(true);
  };

  const stopMusic = () => {
    setCanPlayMusic(false);
  };

  useEffect(() => {
    const audio = new Audio(tick);
    audio.loop = true;

    if (isRunning && canPlayMusic) {
      audio.play();
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
      audio.remove();
    };
  }, [isRunning, canPlayMusic]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="music"
          checked={canPlayMusic}
          onCheckedChange={(state) => (state ? playMusic() : stopMusic())}
        />
        <label
          htmlFor="music"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Play Music
        </label>
      </div>
    </div>
  );
};
