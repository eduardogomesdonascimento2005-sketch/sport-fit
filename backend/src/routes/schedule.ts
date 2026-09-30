import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../lib/auth.js';

const router = Router();
const scheduleSchema = z.object({
  title: z.string().min(2),
  date: z.string().min(1),
  time: z.string().min(1),
  type: z.string().min(2),
  trainer: z.string().min(2)
});

router.get('/', requireAuth, async (_req, res) => {
  const schedule = await prisma.scheduleItem.findMany({
    orderBy: { date: 'asc' }
  });

  return res.json(schedule);
});

router.post('/', requireAuth, async (req, res) => {
  const parsed = scheduleSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: 'Dados da agenda inválidos.' });
  }

  const item = await prisma.scheduleItem.create({ data: parsed.data });
  return res.status(201).json(item);
});

export default router;
