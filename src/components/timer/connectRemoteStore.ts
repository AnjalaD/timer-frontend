import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { BACKEND_WS_URL } from "../../../config";
import { decodeMessage, encodeMessage } from "../../util/ws";
import { immer } from "zustand/middleware/immer";

export type ConnectRemoteStore = {
  ws: WebSocket | undefined;
  isReady: boolean;
  roomId: string | undefined;
  connectedRemotes: number;
  connect: (onStart: any, onPause: any) => void;
  disconnect: () => void;
};

export const useConnectRemoteStore = create<ConnectRemoteStore>()(
  devtools(
    // persist(
    immer((set) => ({
      ws: undefined,
      isReady: false,
      roomId: undefined,
      connectedRemotes: 0,
      connect: (onStart, onPause) =>
        set((state) => {
          const ws = new WebSocket(`${BACKEND_WS_URL}/timer`);
          console.log("Connecting to server...");

          ws.addEventListener("open", () => {
            console.log("Connected to server!");
            ws.send(encodeMessage({ messageType: "CREATE_ROOM" }));
          });

          ws.addEventListener("close", () => {
            console.log("Disconnected from server!");
          });

          ws.addEventListener("error", (error) => {
            console.error("Error:", error);
          });

          ws.addEventListener("message", (event) => {
            console.log({ event });
            const decoded = decodeMessage(event.data);
            switch (decoded.messageType) {
              case "ROOM_CREATED":
                console.log("Rom created:", decoded.data);
                set((state) => {
                  state.isReady = true;
                  state.roomId = decoded.data;
                });
                break;
              case "REMOTE_JOINED":
                console.log("Remote joined:", decoded.data);
                set((state) => {
                  state.connectedRemotes = state.connectedRemotes + 1;
                });
                break;
              case "REMOTE_LEFT":
                console.log("Remote left:", decoded.data);
                set((state) => {
                  state.connectedRemotes = state.connectedRemotes - 1;
                });
                break;
              case "START":
                console.log("Start:", decoded.data);
                onStart();
                break;
              case "PAUSE":
                console.log("Pause:", decoded.data);
                onPause();
                break;
              default:
                console.log("Unhandled message type:", decoded.messageType);
            }
          });

          state.ws = ws;
        }),
      disconnect: () => {
        set((state) => {
          state.ws?.close();

          state.ws = undefined;
          state.isReady = false;
          state.roomId = undefined;
          state.connectedRemotes = 0;
        });
      },
    }))
    //   {
    //     name: "connect-remote-store",
    //   }
    // )
  )
);
