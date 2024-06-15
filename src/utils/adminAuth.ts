import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { serialize } from 'cookie';
import { Response } from 'express';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY ?? 'asjkdfawoefsdfoasf2kj2owoe2o3o2n3ro23owesc0czmxpvqqr1e5';

export const signToken = async (data: object): Promise<string> => {
  return jwt.sign({ data }, SECRET_KEY, {
    expiresIn: '24h',
  });
};

export const verifyToken = (token: string): jwt.JwtPayload | string => {
  return jwt.verify(token, SECRET_KEY);
};

export const setTokenAsCookie = (res: Response, token: string): void => {
  const serialized = serialize('adminToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60,
    path: '/',
  });

  res.setHeader('Set-Cookie', serialized);
};

export const removeCookieToken = (res: Response): void => {
  const serialized = serialize('adminToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });

  res.setHeader('Set-Cookie', serialized);
};
