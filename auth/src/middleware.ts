import { NextFunction, Request, Response } from "express";
import { hash } from "bcryptjs";
import { addUser, getUser } from "./db";
import { generateToken, comparePasswords, verifyToken } from "./utils";

export const restrictAccessByIP = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allowedIPs = [
    "localhost",
    "::ffff:192.168.0.100",
    "192.168.65.1",
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

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await getUser(email);
    if (existingUser) {
      return res.status(409).send("User already exists");
    }

    const hashedPassword = await hash(password, 10);
    await addUser(email, hashedPassword);
    res.status(201).send("User created");
  } catch (err) {
    console.error("[ERROR] Signup error: ", err);
    res.status(500).send("Internal server error");
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await getUser(email);
    if (!user || !(await comparePasswords(password, user.password))) {
      return res.status(401).send("[ERROR] Unauthorized");
    }

    const token = generateToken(email);
    res.status(200).json({ token, message: "Login successful" });
  } catch (err) {
    console.log("[ERROR] Login error:", err);
    res.status(500).send("Internal server error");
  }
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send("No token provided");
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).send("Invalid token");
    }
    req.user = decoded;
    res.json({ valid: true });
    next();
  } catch (err) {
    console.error("[ERROR] Authentication error:", err);
    res.status(401).send("Authentication failed");
  }
};

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
