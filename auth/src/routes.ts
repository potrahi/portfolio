import { Request, Response } from "express";
import { hash } from "bcryptjs";
import { addUser, getUser } from "./db";
import { generateToken, comparePasswords } from "./utils";


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
