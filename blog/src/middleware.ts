import { NextFunction, Request, Response } from "express";
import { HttpError } from "./classes";

// Centralized Error Handling Middleware
export const ErrorHandling = (
  err: HttpError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  const status = "status" in err ? err.status : 500;
  const message = err.message || "Something went wrong!";
  res.status(status).json({ message });
};
