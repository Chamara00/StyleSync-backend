import jwt, { JwtPayload } from 'jsonwebtoken';

const secretKey = 'secretdsf48541sddfkeysdkflsdjk';

export const generateToken = (data: string): string => {
  return jwt.sign({ contactNo: data }, secretKey, { expiresIn: '24h' });
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, secretKey) as JwtPayload;
  } catch (error) {
    // Handle token verification errors
    console.error('Error verifying token:', error);
    throw new Error('Invalid token');
  }
};
