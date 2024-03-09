import { NextFunction, Request, Response } from "express";

export const restrictAccessByIP = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allowedIPs = process.env.ALLOWED_IP?.split(",");

  const requestIP = req.ip || req.socket.remoteAddress || "";
  console.log("[INFO]", "requestIP", requestIP);
  if (allowedIPs?.includes(requestIP)) {
    next();
  } else {
    res.status(403).send("Access Denied");
  }
};
