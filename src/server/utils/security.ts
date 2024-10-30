import bcrypt from "bcrypt";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";

const APP_KEY = process.env.APP_KEY as string;

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const generateJWTToken = (payload: Record<string, any>) => {
  const tokenExpiredInSeconds = 60 * 60 * 24 * 30; // 30 days
  const tokenExpiredAt = dayjs()
    .add(tokenExpiredInSeconds, "seconds")
    .toISOString();

  const token = jwt.sign(payload, APP_KEY, {
    expiresIn: tokenExpiredInSeconds,
  });

  return {
    type: "Bearer",
    token,
    tokenExpiredAt,
  };
};

export const decodeJWTToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, APP_KEY) as Record<string, any>;
    return decoded;
  } catch (error) {
    return null;
  }
};
