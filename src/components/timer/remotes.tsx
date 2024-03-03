import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useConnectRemoteStore } from "./connect-remote-store";

export const Remotes = () => {
  const hasRemotes = useConnectRemoteStore((state) => state.ws !== undefined);
  const connect = useConnectRemoteStore((state) => state.connect);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Remotes</CardTitle>
      </CardHeader>
      <CardContent>
        {!hasRemotes ? (
          <div>
            <Button onClick={connect}>Add Remote</Button>
          </div>
        ) : (
          <RemoteRoom />
        )}
      </CardContent>
    </Card>
  );
};

const RemoteRoom = () => {
  const isReady = useConnectRemoteStore((state) => state.isReady);
  const roomId = useConnectRemoteStore((state) => state.roomId);
  const connectedRemotes = useConnectRemoteStore(
    (state) => state.connectedRemotes
  );

  return isReady ? (
    <div>
      <h2>Timer ID: {roomId}</h2>
      <h2>Connected Remotes: {connectedRemotes}</h2>
    </div>
  ) : (
    <h2>Connecting...</h2>
  );
};
