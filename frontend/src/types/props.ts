import { MessageType } from "./contact";

export type ContactFormProps = {
  onSubmit: (message: MessageType) => void;
};

export type NotificationPopupProps = {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
};
