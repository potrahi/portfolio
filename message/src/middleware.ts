import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./utils";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { token } = req.body.data;
  if (!token) {
    res.status(401).send("No token provided");
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    res.status(401).send("Invalid token");
  }
  next();
};
