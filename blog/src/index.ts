import express from "express";
import cors from "cors";
import blogRouter from "./routes";

const app = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

app.use(express.json());
app.use(cors());

app.use("/blog", blogRouter);

app.listen(PORT, () => {
  console.log(`Blog server is running on port: ${PORT}`);
});
