import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../lib/auth.js';

const router = Router();

router.get('/', requireAuth, async (_req, res) => {
  const [activeStudents, monthlyRevenue, attendanceRate, trainingsToday] = await Promise.all([
    prisma.student.count({ where: { status: 'ACTIVE' } }),
    prisma.payment.aggregate({
      _sum: { value: true },
      where: { status: 'PAID' }
    }),
    prisma.student.aggregate({
      _avg: { attendance: true }
    }),
    prisma.scheduleItem.count({
      where: {
        date: new Date().toISOString().slice(0, 10)
      }
    })
  ]);

  const revenueValue = Number(monthlyRevenue._sum.value ?? 0);
  const attendanceAverage = Number(attendanceRate._avg.attendance ?? 0);

  return res.json({
    activeStudents,
    monthlyRevenue: revenueValue,
    attendanceRate: Math.round(attendanceAverage),
    trainingsToday
  });
});

export default router;
