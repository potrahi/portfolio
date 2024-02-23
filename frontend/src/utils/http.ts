import { QueryClient } from "@tanstack/react-query";
import { MessageType } from "../types/data";
import { CustomError } from "../types/error";

export const queryClient = new QueryClient();

export async function sendMessage(
  message: MessageType
): Promise<boolean | CustomError> {
  const res = await fetch(
    `http://${import.meta.env.VITE_REACT_APP_BACKEND_URL}/message/send`,
    {
      method: "POST",
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    const err = new Error(
      "Something went wrong during sending you message. Try again later..."
    ) as CustomError;
    err.code = res.status;
    err.info = await res.json();
    throw err;
  }

  return true;
}
