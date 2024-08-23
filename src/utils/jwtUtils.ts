import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET, JWT_EXPIRES_IN, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRES_IN } = process.env;

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET as string, { expiresIn: JWT_EXPIRES_IN });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_REFRESH_SECRET as string, { expiresIn: JWT_REFRESH_EXPIRES_IN });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET as string);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, JWT_REFRESH_SECRET as string);
};
