import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./utils";
import { DecodedUserToken } from "./express";
import { HttpError } from "../classes";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.data) {
    throw new HttpError("Auth data was not provided", 400);
  }
  const { token } = req.body.data;
  if (!token) {
    throw new HttpError("No token provided", 401);
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    throw new HttpError("Invalid token", 401);
  }
  req.user = decoded as DecodedUserToken;
  next();
};
