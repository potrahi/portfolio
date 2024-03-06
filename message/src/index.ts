import express from "express";
import cors from "cors";
import msgRouter from "./routes";

const app = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3002;

app.use(cors());
app.use(express.json());

app.use("/message/", msgRouter);

app.listen(PORT, () => {
  console.log(`Message server is running on port: ${PORT}`);
});
