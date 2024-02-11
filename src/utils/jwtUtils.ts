import jwt, { JwtPayload } from 'jsonwebtoken';

const secretKey = '6fc6c975e47868a00d1c18801625f9d9bde2b7f1f75f06005772b8198ebbf5f577dbe0ab4504986b86dbf9fc04c47c8e35983539303d559e9ca86449d9df3ce1';

export const generateToken = (data: number): string => {
  return jwt.sign({ id: data }, secretKey, { expiresIn: '24h' });
};


export const verifyToken = (token: string): number | JwtPayload => {
  return jwt.verify(token, secretKey) as number | JwtPayload;
};
