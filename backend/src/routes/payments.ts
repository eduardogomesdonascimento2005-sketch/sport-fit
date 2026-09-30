import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../lib/auth.js';

const router = Router();
const paymentSchema = z.object({
  studentId: z.string().min(1),
  plan: z.string().min(2),
  value: z.number().min(0),
  dueDate: z.string().min(1),
  status: z.enum(['PAID', 'PENDING']).default('PENDING')
});

router.get('/', requireAuth, async (_req, res) => {
  const payments = await prisma.payment.findMany({
    include: { student: true },
    orderBy: { dueDate: 'asc' }
  });

  return res.json(payments);
});

router.post('/', requireAuth, async (req, res) => {
  const parsed = paymentSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: 'Dados de pagamento inválidos.' });
  }

  const payment = await prisma.payment.create({
    data: {
      ...parsed.data,
      value: parsed.data.value.toString()
    },
    include: { student: true }
  });

  return res.status(201).json(payment);
});

export default router;
