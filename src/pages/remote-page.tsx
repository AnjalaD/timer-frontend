import { useParams } from "react-router-dom";
import { useRemoteStore } from "../components/remote/remote-store";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import { cn } from "../util/cn";

export const RemotePage = () => {
  const { roomId } = useParams<{ roomId: string }>();

  const init = useRemoteStore((state) => state.init);
  const isReady = useRemoteStore((state) => state.isReady);

  const start = useRemoteStore((state) => state.start);
  const pause = useRemoteStore((state) => state.pause);
  const disconnect = useRemoteStore((state) => state.disconnect);

  const [light, setLight] = useState(false);

  const withLight = (fn: () => void) => () => {
    setLight(true);
    setTimeout(() => {
      setLight(false);
    }, 200);
    fn();
  };

  useEffect(() => {
    init(roomId!);
    return () => {
      disconnect();
    };
  }, [roomId, init, disconnect]);

  return (
    <div className="bg-gray-900 text-white">
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative max-w-80 rounded-t-[100px] rounded-b-[200px] bg-black p-16 pb-32 shadow-xl">
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <div
              className={cn(
                "w-8 h-3 rounded-t-[100px] rounded-b-md",
                light ? "bg-green-500" : "bg-black"
              )}
            />
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col gap-4 rounded-xl bg-gray-600 p-4 text-center mb-8">
              <div className="text-xs">Timer ID: {roomId}</div>
              {!isReady ? <div>Connecting...</div> : <div>Connected!</div>}
            </div>

            <Button
              className="rounded-full p-8 text-lg"
              disabled={!isReady}
              onClick={withLight(start)}
            >
              <PlayIcon className="mr-3 h-6 w-6" /> Start
            </Button>
            <Button
              className="rounded-full p-8 text-lg"
              disabled={!isReady}
              variant="outline"
              onClick={withLight(pause)}
            >
              <PauseIcon className="mr-3 h-6 w-6" /> Pause
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
