import { sign, verify } from "jsonwebtoken";
import { compare } from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export function createJSONToken(email: string) {
  return sign({ email }, JWT_SECRET, { expiresIn: "1h" });
}

export function verifyJSONToken(token: string) {
  try {
    const decoded = verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    console.error("Unauthorized", err);
    return null;
  }
}

export async function isValidPassword(
  password: string,
  storedPassword: string = ""
) {
  return compare(password, storedPassword);
}

export function isValidEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value);
}
