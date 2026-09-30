import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../lib/auth.js';

const router = Router();
const workoutSchema = z.object({
  studentId: z.string().min(1),
  title: z.string().min(2),
  focus: z.string().min(2),
  duration: z.string().min(2),
  exercises: z.number().min(1),
  difficulty: z.string().min(2)
});

router.get('/', requireAuth, async (_req, res) => {
  const workouts = await prisma.workout.findMany({
    include: { student: true },
    orderBy: { createdAt: 'desc' }
  });

  return res.json(workouts);
});

router.post('/', requireAuth, async (req, res) => {
  const parsed = workoutSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: 'Dados do treino inválidos.' });
  }

  const workout = await prisma.workout.create({
    data: parsed.data,
    include: { student: true }
  });

  return res.status(201).json(workout);
});

export default router;
