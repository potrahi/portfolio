import { QueryClient } from "@tanstack/react-query";
import { MessageType } from "../types/data";
import { CustomError } from "../types/error";

export const queryClient = new QueryClient();
const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export async function sendMessage(
  message: MessageType
): Promise<boolean | CustomError> {
  try {
    const url = baseUrl ? `http://${baseUrl}/message/send` : "/message/send";

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
