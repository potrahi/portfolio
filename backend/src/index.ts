import express, { Request, Response } from "express";
import path from "path";

const app = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 3001;

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express!" });
});

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
