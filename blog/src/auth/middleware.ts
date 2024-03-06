import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./utils";
import { DecodedUserToken } from "./express";

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
  req.user = decoded as DecodedUserToken;
  next();
};
