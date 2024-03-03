export const MESSAGE_SEPARATOR = "•••";

export const decodeMessage = (message: string): ReceivedMessage => {
  const [messageType, data] = message.split(MESSAGE_SEPARATOR);

  return { messageType: messageType as ReceivedMessageType, data };
};

export const encodeMessage = (message: SendingMessage) => {
  return `${message.messageType}${MESSAGE_SEPARATOR}${message.data ?? ""}`;
};

export type ControlMessageType = "START" | "PAUSE";

export type ReceivedMessageType =
  | ControlMessageType
  | "ROOM_CREATED"
  | "REMOTE_JOINED"
  | "REMOTE_LEFT"
  | "TIMER_LEFT";

export type SendingMessageType =
  | ControlMessageType
  | "CREATE_ROOM"
  | "JOIN_REMOTE";

export type ReceivedMessage = {
  messageType: ReceivedMessageType;
  data: string;
};

export type SendingMessage = {
  messageType: SendingMessageType;
  data?: string;
};
