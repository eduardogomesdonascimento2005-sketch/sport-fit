import jwt, { type JwtPayload } from 'jsonwebtoken';
import { type NextFunction, type Request, type Response } from 'express';
import { prisma } from './prisma.js';

const JWT_SECRET = process.env.JWT_SECRET ?? 'sportfit-dev-secret';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export function signToken(user: AuthUser) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): JwtPayload & { sub: string; email: string; role: string } {
  return jwt.verify(token, JWT_SECRET) as JwtPayload & { sub: string; email: string; role: string };
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token ausente ou inválido.' });
  }

  try {
    const token = authHeader.replace('Bearer ', '');
    const decoded = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.sub },
      select: { id: true, name: true, email: true, role: true }
    });

    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado.' });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Sessão inválida.' });
  }
}
