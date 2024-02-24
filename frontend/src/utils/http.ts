import { QueryClient } from "@tanstack/react-query";
import { MessageType } from "../types/data";
import { CustomError } from "../types/error";

export const queryClient = new QueryClient();

export async function sendMessage(
  message: MessageType
): Promise<boolean | CustomError> {
  try {
    const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const url = baseUrl
      ? `http://${baseUrl}/api/message/send`
      : "/api/message/send";

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      const error: CustomError = new Error(
        "Something went wrong during sending your message. Try again later..."
      ) as CustomError;
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}
