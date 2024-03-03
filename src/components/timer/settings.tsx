import { CheckedState } from "@radix-ui/react-checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { useSettingsStore } from "./settings-store";

export const Settings = () => {
  const settingsStore = useSettingsStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <CheckboxSetting
            name="show-clock"
            label="Show Clock"
            checked={settingsStore.clockVisible}
            onCheckedChange={settingsStore.toggleClock}
          />
          <CheckboxSetting
            name="music-enabled"
            label="Play Sound"
            checked={settingsStore.musicEnabled}
            onCheckedChange={settingsStore.toggleMusic}
          />
        </div>
      </CardContent>
    </Card>
  );
};

type CheckboxSettingProps = {
  name: string;
  label: React.ReactNode;
  checked: boolean;
  onCheckedChange: (checked: CheckedState) => void;
};
const CheckboxSetting = ({
  name,
  label,
  checked,
  onCheckedChange,
}: CheckboxSettingProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={name}
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
        <label
          htmlFor={name}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      </div>
    </div>
  );
};
