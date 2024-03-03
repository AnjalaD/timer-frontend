import { Button } from "../ui/button";
import { useConnectRemoteStore } from "./connectRemoteStore";
import { useTimerContext } from "./timer-provider";

export const Remotes = () => {
  const hasRemotes = useConnectRemoteStore((state) => state.ws !== undefined);
  const connect = useConnectRemoteStore((state) => state.connect);

  const { start, pause } = useTimerContext();

  return !hasRemotes ? (
    <div>
      <Button onClick={() => connect(start, pause)}>Add Remote</Button>
    </div>
  ) : (
    <RemoteRoom />
  );
};

const RemoteRoom = () => {
  const isReady = useConnectRemoteStore((state) => state.isReady);
  const roomId = useConnectRemoteStore((state) => state.roomId);
  const connectedRemotes = useConnectRemoteStore(
    (state) => state.connectedRemotes
  );

  return (
    <div>
      {isReady ? (
        <div>
          <h2>Timer ID: {roomId}</h2>
          <h2>Connected Remotes: {connectedRemotes}</h2>
        </div>
      ) : (
        <h2>Connecting...</h2>
      )}
    </div>
  );
};
