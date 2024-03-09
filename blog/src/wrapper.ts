import { NextFunction, Request, RequestHandler, Response } from "express";

// Async wrapper for handling exceptions in async routes
export const asyncHandler = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
};
