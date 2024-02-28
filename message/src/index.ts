import express, { Request, Response } from "express";
import cors from "cors";
import { addMessage, allMessages } from "./db";
import { authenticate } from "./utils";

const app = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

app.use(cors());
app.use(express.json());

app.post("/message/send", async (req: Request, res: Response) => {
  const { email, message } = req.body;
  if (!email || !message) {
    return res.status(400).send({ message: "Email and message are required." });
  }

  try {
    await addMessage(email, message);
    res.status(200).send({ message: "Message received successfully!" });
  } catch (err) {
    console.error("[ERROR] Error adding message: ", err);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.get("/message/all", authenticate, async (req: Request, res: Response) => {
  try {
    const messages = await allMessages();
    res.status(200).send({ message: "List of stored Messages", messages });
  } catch (err) {
    console.error("[ERROR] Error fetching messages: ", err);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Message server is running on port: ${PORT}`);
});
