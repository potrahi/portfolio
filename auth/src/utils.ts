import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const { sign, verify } = jwt;
const { compare } = bcrypt;

const JWT_SECRET: string = process.env.JWT_SECRET || "supersecret";

type TokenPayload = {
  email: string;
};

function generateToken(email: string) {
  return sign({ email } as TokenPayload, JWT_SECRET, { expiresIn: "1h" });
}

function verifyToken(token: string): string | jwt.JwtPayload | null {
  try {
    return verify(token, JWT_SECRET) as string | jwt.JwtPayload;
  } catch (err) {
    console.error("Authentication failed", err);
    return null;
  }
}

async function comparePasswords(
  password: string,
  storedPassword: string
): Promise<boolean> {
  return compare(password, storedPassword);
}

function validateEmail(value: string): boolean {
  const emailRegex: RegExp = /\S+@\S+\.\S+/;
  return emailRegex.test(value);
}

export { generateToken, verifyToken, comparePasswords, validateEmail };
