import { useUiContext } from "./ui-provider";
import { Checkbox } from "../ui/checkbox";

export const UiControls = () => {
  const { isClockVisible, showClock, hideClock } = useUiContext();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="clock"
          checked={isClockVisible}
          onCheckedChange={(state) => (state ? showClock() : hideClock())}
        />
        <label
          htmlFor="clock"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Show Clock
        </label>
      </div>
    </div>
  );
};
