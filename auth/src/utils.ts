import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const { sign } = jwt;
const { compare } = bcrypt;

const JWT_SECRET: string = process.env.JWT_SECRET || "supersecret";

type TokenPayload = {
  id: string;
  email: string;
};

function generateToken(id: string, email: string) {
  return sign({ id, email } as TokenPayload, JWT_SECRET, { expiresIn: "15m" });
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

export { generateToken, comparePasswords, validateEmail };
