import type { DashboardData, Payment, ProgressRecord, ScheduleItem, Student, User, Workout } from './types.js';

export const users: User[] = [
  {
    id: 'u1',
    name: 'Marina Costa',
    email: 'admin@sportfit.com',
    password: '123456',
    role: 'admin',
    avatar: 'MC'
  },
  {
    id: 'u2',
    name: 'Lucas Martins',
    email: 'lucas@trainer.com',
    password: '123456',
    role: 'trainer',
    avatar: 'LM'
  },
  {
    id: 'u3',
    name: 'Pedro Almeida',
    email: 'pedro@student.com',
    password: '123456',
    role: 'student',
    avatar: 'PA'
  }
];

export const students: Student[] = [
  {
    id: 's1',
    name: 'Ana Souza',
    age: 29,
    objective: 'Emagrecimento',
    status: 'ativo',
    trainer: 'Lucas Martins',
    plan: 'Premium',
    attendance: 92
  },
  {
    id: 's2',
    name: 'Bruno Lima',
    age: 34,
    objective: 'Hipertrofia',
    status: 'ativo',
    trainer: 'Lucas Martins',
    plan: 'Gold',
    attendance: 88
  },
  {
    id: 's3',
    name: 'Carla Ferreira',
    age: 27,
    objective: 'Condicionamento',
    status: 'inativo',
    trainer: 'Nina Rocha',
    plan: 'Basic',
    attendance: 64
  },
  {
    id: 's4',
    name: 'Daniel Nogueira',
    age: 41,
    objective: 'Mobilidade',
    status: 'ativo',
    trainer: 'Nina Rocha',
    plan: 'Premium',
    attendance: 96
  }
];

export const workouts: Workout[] = [
  {
    id: 'w1',
    title: 'Treino de força A',
    student: 'Ana Souza',
    focus: 'Pernas e glúteos',
    duration: '50 min',
    exercises: 6,
    difficulty: 'Intermediário'
  },
  {
    id: 'w2',
    title: 'Treino de resistência',
    student: 'Bruno Lima',
    focus: 'Cardio e core',
    duration: '45 min',
    exercises: 5,
    difficulty: 'Avançado'
  },
  {
    id: 'w3',
    title: 'Treino funcional',
    student: 'Daniel Nogueira',
    focus: 'Mobilidade e postura',
    duration: '40 min',
    exercises: 4,
    difficulty: 'Iniciante'
  }
];

export const schedule: ScheduleItem[] = [
  {
    id: 'sc1',
    title: 'Treino individual',
    date: '2026-09-30',
    time: '08:00',
    type: 'Treino',
    trainer: 'Lucas Martins'
  },
  {
    id: 'sc2',
    title: 'Aula de spinning',
    date: '2026-09-30',
    time: '10:30',
    type: 'Aula',
    trainer: 'Nina Rocha'
  },
  {
    id: 'sc3',
    title: 'Avaliação corporal',
    date: '2026-09-30',
    time: '15:30',
    type: 'Avaliação',
    trainer: 'Lucas Martins'
  }
];

export const payments: Payment[] = [
  {
    id: 'p1',
    student: 'Ana Souza',
    plan: 'Premium',
    value: 149.9,
    dueDate: '2026-10-05',
    status: 'Pago'
  },
  {
    id: 'p2',
    student: 'Bruno Lima',
    plan: 'Gold',
    value: 199.9,
    dueDate: '2026-10-07',
    status: 'Pendente'
  },
  {
    id: 'p3',
    student: 'Daniel Nogueira',
    plan: 'Premium',
    value: 149.9,
    dueDate: '2026-10-02',
    status: 'Pago'
  }
];

export const progress: ProgressRecord[] = [
  {
    id: 'pr1',
    student: 'Ana Souza',
    date: '2026-09-15',
    weight: 68.2,
    waist: 79,
    chest: 96
  },
  {
    id: 'pr2',
    student: 'Bruno Lima',
    date: '2026-09-18',
    weight: 81.5,
    waist: 92,
    chest: 104
  },
  {
    id: 'pr3',
    student: 'Daniel Nogueira',
    date: '2026-09-12',
    weight: 76.4,
    waist: 88,
    chest: 101
  }
];

export const dashboard: DashboardData = {
  activeStudents: 28,
  monthlyRevenue: 12850,
  attendanceRate: 91,
  trainingsToday: 12
};
