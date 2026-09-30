import { useEffect, useState } from 'react';

interface DashboardData {
  activeStudents: number;
  monthlyRevenue: number;
  attendanceRate: number;
  trainingsToday: number;
}

interface Student {
  id: string;
  name: string;
  age: number;
  objective: string;
  status: 'ativo' | 'inativo';
  trainer: string;
  plan: string;
  attendance: number;
}

interface Workout {
  id: string;
  title: string;
  student: string;
  focus: string;
  duration: string;
  exercises: number;
  difficulty: string;
}

interface ScheduleItem {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
  trainer: string;
}

interface Payment {
  id: string;
  student: string;
  plan: string;
  value: number;
  dueDate: string;
  status: string;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);

export default function App() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/dashboard'),
      fetch('/api/students'),
      fetch('/api/workouts'),
      fetch('/api/schedule'),
      fetch('/api/payments')
    ])
      .then(async ([dashboardRes, studentsRes, workoutsRes, scheduleRes, paymentsRes]) => {
        const dashboardData = await dashboardRes.json();
        const studentsData = await studentsRes.json();
        const workoutsData = await workoutsRes.json();
        const scheduleData = await scheduleRes.json();
        const paymentsData = await paymentsRes.json();

        setDashboard(dashboardData);
        setStudents(studentsData);
        setWorkouts(workoutsData);
        setSchedule(scheduleData);
        setPayments(paymentsData);
      })
      .catch((error) => {
        console.error('Erro ao carregar dados da API:', error);
      });
  }, []);

  if (!dashboard) {
    return <div className="loading">Carregando SportFit...</div>;
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">SportFit</div>
        <nav>
          <a className="nav-item active" href="#">Dashboard</a>
          <a className="nav-item" href="#">Alunos</a>
          <a className="nav-item" href="#">Treinos</a>
          <a className="nav-item" href="#">Agenda</a>
          <a className="nav-item" href="#">Pagamentos</a>
        </nav>
      </aside>

      <main className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow">Painel administrativo</p>
            <h1>Bem-vindo ao SportFit</h1>
          </div>
          <button className="primary-btn">Adicionar aluno</button>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <span>Alunos ativos</span>
            <strong>{dashboard.activeStudents}</strong>
          </div>
          <div className="stat-card accent">
            <span>Faturamento</span>
            <strong>{formatCurrency(dashboard.monthlyRevenue)}</strong>
          </div>
          <div className="stat-card">
            <span>Presença</span>
            <strong>{dashboard.attendanceRate}%</strong>
          </div>
          <div className="stat-card">
            <span>Treinos hoje</span>
            <strong>{dashboard.trainingsToday}</strong>
          </div>
        </section>

        <section className="panel-grid">
          <div className="panel">
            <div className="panel-header">
              <h2>Alunos</h2>
              <span>Últimos cadastros</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Objetivo</th>
                  <th>Plano</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.objective}</td>
                    <td>{student.plan}</td>
                    <td>
                      <span className={`status ${student.status}`}>{student.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h2>Treinos</h2>
              <span>Programação</span>
            </div>
            <div className="stack-list">
              {workouts.map((workout) => (
                <div key={workout.id} className="list-item">
                  <div>
                    <h3>{workout.title}</h3>
                    <p>{workout.student}</p>
                  </div>
                  <span>{workout.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="panel-grid">
          <div className="panel">
            <div className="panel-header">
              <h2>Agenda</h2>
              <span>Hoje</span>
            </div>
            <div className="stack-list">
              {schedule.map((item) => (
                <div key={item.id} className="schedule-item">
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.type} • {item.trainer}</p>
                  </div>
                  <div className="time-box">
                    <span>{item.date}</span>
                    <strong>{item.time}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h2>Pagamentos</h2>
              <span>Mensal</span>
            </div>
            <div className="stack-list">
              {payments.map((payment) => (
                <div key={payment.id} className="payment-item">
                  <div>
                    <strong>{payment.student}</strong>
                    <p>{payment.plan}</p>
                  </div>
                  <div className="payment-meta">
                    <span>{payment.status}</span>
                    <strong>{formatCurrency(payment.value)}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
