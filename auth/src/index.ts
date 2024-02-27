import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { authenticate, login, signup } from "./middleware";

const app = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/auth/signup", signup);
app.post("/auth/login", login);
app.post("/auth/verify", authenticate);

app.listen(PORT, () => {
  console.log(`Auth server running on port ${PORT}`);
});
