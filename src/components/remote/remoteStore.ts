import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { BACKEND_WS_URL } from "../../../config";
import { decodeMessage, encodeMessage } from "../../util/ws";
import { immer } from "zustand/middleware/immer";

export type RemoteStore = {
  ws: WebSocket | undefined;
  isReady: boolean;
  init: (roomId: string) => void;
  start: () => void;
  pause: () => void;
  disconnect: () => void;
};

export const useRemoteStore = create<RemoteStore>()(
  devtools(
    // persist(
    immer((set) => ({
      ws: undefined,
      isReady: false,
      init: (roomId: string) =>
        set((state) => {
          const ws = new WebSocket(`${BACKEND_WS_URL}/timer`);
          console.log("Connecting to server...");

          ws.addEventListener("open", () => {
            console.log("Connected to server!");
            ws.send(
              encodeMessage({ messageType: "JOIN_REMOTE", data: roomId })
            );
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
              case "REMOTE_JOINED":
                console.log("Remote joined!");
                set((state) => {
                  state.isReady = true;
                });
                break;
              default:
                console.log("Unhandled message type:", decoded.messageType);
            }
          });

          state.ws = ws;
        }),
      start: () => {
        set((state) => {
          state.ws?.send(encodeMessage({ messageType: "START" }));
        });
      },
      pause: () => {
        set((state) => {
          state.ws?.send(encodeMessage({ messageType: "PAUSE" }));
        });
      },
      disconnect: () => {
        set((state) => {
          state.ws?.close();
          state.ws = undefined;
          state.isReady = false;
        });
      },
    }))
    //   {
    //     name: "remote-store",
    //   }
    // )
  )
);
