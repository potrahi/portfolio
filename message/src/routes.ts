import express, { Response, Request } from "express";
import { authenticate } from "./auth/middleware";
import { addMessage, allMessages } from "./db";

const router = express.Router();

router.get("/", authenticate, async (req: Request, res: Response) => {
  const { email, message } = req.body;
  if (!email || !message) {
    res.status(400).send({ message: "Email and message are required." });
  }

  try {
    await addMessage(email, message);
    res.status(200).send({ message: "Message received successfully!" });
  } catch (err) {
    console.error("[ERROR] Error adding message: ", err);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/send", async (req: Request, res: Response) => {
  try {
    const messages = await allMessages();
    res.status(200).send({ message: "List of stored Messages", messages });
  } catch (err) {
    console.error("[ERROR] Error fetching messages: ", err);
    res.status(500).send({ message: "Internal server error" });
  }
});

export default router;
