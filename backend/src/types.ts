export type UserRole = 'admin' | 'trainer' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar: string;
}

export interface Student {
  id: string;
  name: string;
  age: number;
  objective: string;
  status: 'ativo' | 'inativo';
  trainer: string;
  plan: string;
  attendance: number;
}

export interface Workout {
  id: string;
  title: string;
  student: string;
  focus: string;
  duration: string;
  exercises: number;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
}

export interface ScheduleItem {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'Treino' | 'Aula' | 'Avaliação';
  trainer: string;
}

export interface Payment {
  id: string;
  student: string;
  plan: string;
  value: number;
  dueDate: string;
  status: 'Pago' | 'Pendente';
}

export interface ProgressRecord {
  id: string;
  student: string;
  date: string;
  weight: number;
  waist: number;
  chest: number;
}

export interface DashboardData {
  activeStudents: number;
  monthlyRevenue: number;
  attendanceRate: number;
  trainingsToday: number;
}
