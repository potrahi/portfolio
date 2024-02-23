import { MessageType } from "./data";

export type ContactFormProps = {
  onSubmit: (message: MessageType) => void;
};

export type NotificationPopupProps = {
  message?: string;
  type: string;
  onClose: () => void;
};
