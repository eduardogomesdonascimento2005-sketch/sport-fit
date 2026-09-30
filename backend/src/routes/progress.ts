import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../lib/auth.js';

const router = Router();
const progressSchema = z.object({
  studentId: z.string().min(1),
  date: z.string().min(1),
  weight: z.number().min(0),
  waist: z.number().min(0),
  chest: z.number().min(0)
});

router.get('/', requireAuth, async (_req, res) => {
  const progress = await prisma.progressRecord.findMany({
    include: { student: true },
    orderBy: { date: 'asc' }
  });

  return res.json(progress);
});

router.post('/', requireAuth, async (req, res) => {
  const parsed = progressSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: 'Dados de evolução inválidos.' });
  }

  const record = await prisma.progressRecord.create({
    data: {
      ...parsed.data,
      weight: parsed.data.weight.toString()
    },
    include: { student: true }
  });

  return res.status(201).json(record);
});

export default router;
