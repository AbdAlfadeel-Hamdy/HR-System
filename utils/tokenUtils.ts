import jwt from 'jsonwebtoken';

export type TokenPayload = {
  id: string;
  name: string;
  role: string;
};

export const createJWT = async (payload: TokenPayload) => {
  if (!process.env.JWT_SECRET) return;

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

export const verifyJWT = (token: string): TokenPayload | undefined => {
  if (!process.env.JWT_SECRET) return;

  const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;

  return decoded;
};
