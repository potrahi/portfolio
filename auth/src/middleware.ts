import { NextFunction, Request, Response } from "express";
import { hash } from "bcryptjs";
import { add, get } from "./db";
import { createJSONToken, isValidPassword, verifyJSONToken } from "./utils";

export const allowAccessFromSpecifiIP = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allowedIPs = ["localhost", "192.168.0.100"];
  const requestIP = req.ip || req.socket.remoteAddress || "";
  if (allowedIPs.includes(requestIP)) {
    next();
  } else {
    res.status(403).send("Access denied");
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log("[INFO] Signup ", "Email: ", email, "Password:", password);
    const existingUser = await get(email);
    if (existingUser) {
      return res.status(409).send("User already exists");
    }

    const hashedPassword = await hash(password, 10);
    await add(email, hashedPassword);
    res.status(201).send("User created");
  } catch (err) {
    console.error("Signup error: ", err);
    res.status(500).send("Initial server error");
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("[INFO] Login ", "Email: ", email, "Password:", password);
  try {
    const user = await get(email);

    if (!user || !user.password) {
      return res.status(401).send("Unauthorized");
    }

    const isValid = await isValidPassword(password, user.password);
    if (!isValid) {
      return res.status(401).send("Unauthorized");
    }
    const token = createJSONToken(email);
    res.status(200).json({ token, message: "Login successful" });
  } catch (err) {
    console.log("Login error:", err);
    res.status(500).send("Internal server error");
  }
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.body.token?.split(" ")[1];
    if (!token) {
      return res.status(401).send("Unauthorized");
    }
    const decoded = verifyJSONToken(token);
    if (!decoded) {
      throw new Error("Invalid token");
    }
    res.json({ decoded, valid: true });
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send(err);
  }
};
