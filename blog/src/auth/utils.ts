import jwt from "jsonwebtoken";

const { verify } = jwt;

const JWT_SECRET: string = process.env.JWT_SECRET || "supersecret";

export const verifyToken = (token: string): string | jwt.JwtPayload | null => {
  try {
    return verify(token, JWT_SECRET) as string | jwt.JwtPayload;
  } catch (err) {
    console.error("[ERROR]", "Authentication failed", err);
    return null;
  }
};
