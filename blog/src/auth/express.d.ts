import { Request } from "express";

type DecodedUserToken = {
  id: string;
  email: string;
  exp: number;
  iat: number;
};

declare global {
  namespace Express {
    interface Request {
      user?: DecodedUserToken;
    }
  }
}
