import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { addMessage, allMessages } from "./db";
import { authenticate } from "./utils";

const app = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 3001;

app.use(cors());
app.use(bodyParser.json());

app.post("/message/send", async (req: Request, res: Response) => {
  const result = await addMessage(req.body.email, req.body.message);
  if (!result) {
    res.status(500).send({ message: "Internal error" });
  } else {
    res.status(200).send({ message: "Message received successfully!" });
  }
});

app.get("/message/all", authenticate, async (req: Request, res: Response) => {
  const result = await allMessages();
  if (!result) {
    res.status(500).send({ message: "Internal error" });
  } else {
    res.status(200).send({ message: "List of stored Messages", result });
  }
});

app.listen(PORT, () => {
  console.log(`Message server is running on http://localhost:${PORT}`);
});
