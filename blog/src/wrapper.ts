import { NextFunction, Request, RequestHandler, Response } from "express";
import { HttpError } from "./classes";

// Wrapper function that catches errors from the authenticate middleware
export const withTryCatch = (
  middleware: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await middleware(req, res, next);
    } catch (error) {
      console.error("Authentication error:", error);
      if (res.headersSent) {
        // If headers are already sent, delegate to the default Express error handler
        return next(error);
      }
      if (error instanceof HttpError) {
        // If it's an HttpError, use its status and message
        return res.status(error.status).json({ message: error.message });
      }
      // For other types of errors, respond with a generic 500 error
      return res.status(500).json({ message: "Internal server error" });
    }
  };
};

// Async wrapper for handling exceptions in async routes
export const asyncHandler = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
};
