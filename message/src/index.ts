import express from "express";
import cors from "cors";
import { createMessage, listMessages } from "./routes";
import { authenticate } from "./middleware";

const app = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

app.use(cors());
app.use(express.json());

app.get("/", authenticate, listMessages);
app.post("/send", createMessage);

app.listen(PORT, () => {
  console.log(`Message server is running on port: ${PORT}`);
});
