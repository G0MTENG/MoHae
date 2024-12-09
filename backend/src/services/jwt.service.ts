import jwt, { Jwt, JwtPayload } from 'jsonwebtoken';

type JWTKeyType = 'REFRESH' | 'ACCESS';

export class JWTService {
  private static JWTKeys: Record<JWTKeyType, string> = {
    REFRESH: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
    ACCESS: process.env.JWT_ACCESS_SECRET || 'access_secret',
  }
  
  static generateToken(payload: any, keyType: JWTKeyType, options?: jwt.SignOptions) {
    return jwt.sign(payload, this.JWTKeys[keyType], { expiresIn: keyType === 'ACCESS' ? '30m' : '14d', ...options });
  }

  static verifyToken(token: string, keyType: JWTKeyType, options?: jwt.VerifyOptions) {
    try {
      return jwt.verify(token, this.JWTKeys[keyType], options);
    } catch (error) {
      return null;
    }
  }
}