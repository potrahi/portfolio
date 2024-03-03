import express from "express";
import cors from "cors";
import { restrictAccessByIP } from "./middleware";
import { login, signup } from "./routes";

const app = express();
const PORT: number = process.env.PORT
  ? parseInt(process.env.PORT as string, 10)
  : 3000;

app.use(cors());
app.use(express.json());

app.post("/signup", restrictAccessByIP, signup);
app.post("/login", login);

app.listen(PORT, () => {
  console.log(`Auth server running on port: ${PORT}`);
});
