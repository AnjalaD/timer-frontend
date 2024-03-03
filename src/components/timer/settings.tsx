import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MusicControls } from "./music-controls";
import { UiControls } from "./ui-controls";

export const Settings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <UiControls />
          <MusicControls />
        </div>
      </CardContent>
    </Card>
  );
};
