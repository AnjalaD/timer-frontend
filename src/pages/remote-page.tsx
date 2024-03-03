import { useParams } from "react-router-dom";
import { useRemoteStore } from "../components/remote/remote-store";
import { useEffect } from "react";
import { Button } from "../components/ui/button";

export const RemotePage = () => {
  const { roomId } = useParams<{ roomId: string }>();

  const init = useRemoteStore((state) => state.init);
  const isReady = useRemoteStore((state) => state.isReady);

  const start = useRemoteStore((state) => state.start);
  const pause = useRemoteStore((state) => state.pause);
  const disconnect = useRemoteStore((state) => state.disconnect);

  useEffect(() => {
    init(roomId!);
    return () => {
      disconnect();
    };
  }, [roomId, init, disconnect]);

  return (
    <div className="bg-gray-900 text-white">
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-80 rounded-2xl bg-black p-4">
          <p>Timer ID: {roomId}</p>
          {!isReady ? <p>Connecting...</p> : <p>Connected!</p>}

          <div className="flex flex-col items-center gap-8">
            <Button disabled={!isReady} onClick={start}>
              Start
            </Button>

            <Button disabled={!isReady} variant="outline" onClick={pause}>
              Pause
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
