import { NextFunction, Request, Response } from "express";

export const restrictAccessByIP = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allowedIPs = [
    "localhost",
    "::ffff:192.168.0.100",
    "::ffff:192.168.65.1",
    "::1",
    "::ffff:172.20.0.1",
  ];
  const requestIP = req.ip || req.socket.remoteAddress || "";
  console.log("[INFO]", "requestIP", requestIP);
  if (allowedIPs.includes(requestIP)) {
    next();
  } else {
    res.status(403).send("Access Denied");
  }
};
