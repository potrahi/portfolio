import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 3001;

app.use(cors());
app.use(bodyParser.json());

app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express!" });
});

app.post("/message/send", (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).send({ message: "Message received successfully!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
