import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('123456', 10);

  await prisma.user.upsert({
    where: { email: 'admin@sportfit.com' },
    update: {},
    create: {
      name: 'Marina Costa',
      email: 'admin@sportfit.com',
      password: adminPassword,
      role: 'ADMIN',
      avatar: 'MC'
    }
  });

  await prisma.user.upsert({
    where: { email: 'lucas@trainer.com' },
    update: {},
    create: {
      name: 'Lucas Martins',
      email: 'lucas@trainer.com',
      password: await bcrypt.hash('123456', 10),
      role: 'TRAINER',
      avatar: 'LM'
    }
  });

  const studentAna = await prisma.student.upsert({
    where: { id: 'seed-ana' },
    update: {},
    create: {
      id: 'seed-ana',
      name: 'Ana Souza',
      age: 29,
      objective: 'Emagrecimento',
      status: 'ACTIVE',
      trainer: 'Lucas Martins',
      plan: 'Premium',
      attendance: 92
    }
  });

  const studentBruno = await prisma.student.upsert({
    where: { id: 'seed-bruno' },
    update: {},
    create: {
      id: 'seed-bruno',
      name: 'Bruno Lima',
      age: 34,
      objective: 'Hipertrofia',
      status: 'ACTIVE',
      trainer: 'Lucas Martins',
      plan: 'Gold',
      attendance: 88
    }
  });

  await prisma.workout.upsert({
    where: { id: 'seed-workout-ana' },
    update: {},
    create: {
      id: 'seed-workout-ana',
      studentId: studentAna.id,
      title: 'Treino de força A',
      focus: 'Pernas e glúteos',
      duration: '50 min',
      exercises: 6,
      difficulty: 'Intermediário'
    }
  });

  await prisma.workout.upsert({
    where: { id: 'seed-workout-bruno' },
    update: {},
    create: {
      id: 'seed-workout-bruno',
      studentId: studentBruno.id,
      title: 'Treino de resistência',
      focus: 'Cardio e core',
      duration: '45 min',
      exercises: 5,
      difficulty: 'Avançado'
    }
  });

  await prisma.scheduleItem.upsert({
    where: { id: 'seed-schedule-1' },
    update: {},
    create: {
      id: 'seed-schedule-1',
      title: 'Treino individual',
      date: '2026-09-30',
      time: '08:00',
      type: 'Treino',
      trainer: 'Lucas Martins'
    }
  });

  await prisma.payment.upsert({
    where: { id: 'seed-payment-ana' },
    update: {},
    create: {
      id: 'seed-payment-ana',
      studentId: studentAna.id,
      plan: 'Premium',
      value: 149.90,
      dueDate: '2026-10-05',
      status: 'PAID'
    }
  });

  await prisma.progressRecord.upsert({
    where: { id: 'seed-progress-ana' },
    update: {},
    create: {
      id: 'seed-progress-ana',
      studentId: studentAna.id,
      date: '2026-09-15',
      weight: 68.20,
      waist: 79,
      chest: 96
    }
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((error) => {
    console.error(error);
    prisma.$disconnect();
    process.exit(1);
  });
