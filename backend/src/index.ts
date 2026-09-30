import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { z } from 'zod';

import { dashboard, payments, progress, schedule, students, users, workouts } from './data.js';

const app = express();
const PORT = Number(process.env.PORT ?? 3001);

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'sport-fit-backend',
    timestamp: new Date().toISOString()
  });
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3)
});

app.post('/api/auth/login', (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: 'Email e senha inválidos.' });
  }

  const { email, password } = parsed.data;
  const user = users.find((item) => item.email === email && item.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Credenciais incorretas.' });
  }

  const { password: _password, ...safeUser } = user;

  return res.json({
    token: 'demo-token-sportfit',
    user: safeUser
  });
});

app.get('/api/dashboard', (_req: Request, res: Response) => {
  res.json(dashboard);
});

app.get('/api/students', (_req: Request, res: Response) => {
  res.json(students);
});

app.get('/api/workouts', (_req: Request, res: Response) => {
  res.json(workouts);
});

app.get('/api/schedule', (_req: Request, res: Response) => {
  res.json(schedule);
});

app.get('/api/payments', (_req: Request, res: Response) => {
  res.json(payments);
});

app.get('/api/progress', (_req: Request, res: Response) => {
  res.json(progress);
});

app.listen(PORT, () => {
  console.log(`SportFit API running on http://localhost:${PORT}`);
});
