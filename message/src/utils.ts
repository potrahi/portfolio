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

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "http://auth:3000"
      : "http://localhost:3000";
  const verifyUrl = `${baseUrl}/auth/verify`;

  try {
    const { data } = await axios.post<ResponseType>(
      verifyUrl,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (data.valid) {
      next();
    } else {
      res.status(401).send("[ERROR] Unauthorized");
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error("[ERROR] Authentication error:", err.message);
    } else {
      console.error("[ERROR] An unexpected error occurred", err);
    }
    res.status(500).send("Internal server error");
  }
};
