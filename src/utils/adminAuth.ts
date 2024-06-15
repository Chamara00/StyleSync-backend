import jwt from 'jsonwebtoken';

if (!process.env.ADMIN_SECRET) {
  throw new Error('ADMIN_SECRET environment variable is not defined.');
}
const secret = process.env.ADMIN_SECRET;

interface Admin {
  id: string;
  email: string;
}

export const generateToken = (admin: Admin): string => {
  return jwt.sign({ id: admin.id, email: admin.email }, secret, { expiresIn: '1h' });
};

export const verifyToken = (token: string): jwt.JwtPayload | string => {
  return jwt.verify(token, secret);
};
