import { QueryClient } from "@tanstack/react-query";
import { MessageType } from "../types/contact";
import { CustomError } from "../types/error";

export const queryClient = new QueryClient();

export async function sendMessage(
  message: MessageType
): Promise<boolean | CustomError> {
  const backendUrl =
    import.meta.env.VITE_REACT_APP_BACKEND_URL || "localhost:3001";
  const res = await fetch(`http://${backendUrl}/message/send`, {
    method: "POST",
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const err = new Error(
      "Something went wrong during sending you message. Try again later..."
    ) as CustomError;
    console.log(err);
    err.code = res.status;
    err.info = await res.json();
    throw err;
  }

  return true;
}
