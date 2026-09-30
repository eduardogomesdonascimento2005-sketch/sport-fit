import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../lib/auth.js';

const router = Router();
const studentSchema = z.object({
  name: z.string().min(2),
  age: z.number().min(10),
  objective: z.string().min(2),
  trainer: z.string().min(2),
  plan: z.string().min(2),
  attendance: z.number().min(0).max(100).default(0),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE')
});

router.get('/', requireAuth, async (_req, res) => {
  const students = await prisma.student.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return res.json(students);
});

router.post('/', requireAuth, async (req, res) => {
  const parsed = studentSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: 'Dados do aluno inválidos.', errors: parsed.error.flatten() });
  }

  const student = await prisma.student.create({
    data: {
      ...parsed.data,
      status: parsed.data.status
    }
  });

  return res.status(201).json(student);
});

router.put('/:id', requireAuth, async (req, res) => {
  const parsed = studentSchema.partial().safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: 'Dados do aluno inválidos.' });
  }

  const student = await prisma.student.update({
    where: { id: req.params.id },
    data: parsed.data
  });

  return res.json(student);
});

router.delete('/:id', requireAuth, async (req, res) => {
  await prisma.student.delete({ where: { id: req.params.id } });
  return res.status(204).send();
});

export default router;
