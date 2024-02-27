import { Request, Response, NextFunction } from "express";
import axios from "axios";

type ResponseType = {
  valid?: boolean;
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization;

  const url =
    process.env.NODE_ENV === "production"
      ? "http://auth:3000/auth/verify"
      : "http://localhost:3000/auth/verify";
  console.log(url);
  try {
    const response = await axios.post(
      url,
      { token },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data as ResponseType;
    if (data.valid) {
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(500).send("Internal server error");
    } else {
      console.error("An unexpected error occurred");
      res.status(500).send("Internal server error");
    }
  }
};
