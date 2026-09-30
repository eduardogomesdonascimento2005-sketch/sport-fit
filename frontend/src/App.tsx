import { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

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
  status: 'ACTIVE' | 'INACTIVE';
  trainer: string;
  plan: string;
  attendance: number;
}

interface Workout {
  id: string;
  title: string;
  student: { name: string };
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
  student: { name: string };
  plan: string;
  value: number | string;
  dueDate: string;
  status: 'PAID' | 'PENDING';
}

interface ProgressItem {
  id: string;
  student: { name: string };
  date: string;
  weight: number | string;
  waist: number;
  chest: number;
}

const API_BASE = 'http://localhost:3001/api';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('sportfit_token');

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {})
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Erro na requisição');
  }

  return response.json() as Promise<T>;
}

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('sportfit_token'));
  const [user, setUser] = useState<User | null>(null);
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginForm, setLoginForm] = useState({
    email: 'admin@sportfit.com',
    password: '123456'
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [dashboardData, studentsData, workoutsData, scheduleData, paymentsData, progressData] = await Promise.all([
        apiFetch<DashboardData>('/dashboard'),
        apiFetch<Student[]>('/students'),
        apiFetch<Workout[]>('/workouts'),
        apiFetch<ScheduleItem[]>('/schedule'),
        apiFetch<Payment[]>('/payments'),
        apiFetch<ProgressItem[]>('/progress')
      ]);

      setDashboard(dashboardData);
      setStudents(studentsData);
      setWorkouts(workoutsData);
      setSchedule(scheduleData);
      setPayments(paymentsData);
      setProgress(progressData);
      setError('');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar dados';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    const storedUser = localStorage.getItem('sportfit_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    loadData();
  }, [token]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await apiFetch<{ token: string; user: User }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginForm)
      });

      localStorage.setItem('sportfit_token', response.token);
      localStorage.setItem('sportfit_user', JSON.stringify(response.user));
      setToken(response.token);
      setUser(response.user);
      setError('');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Falha ao fazer login';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sportfit_token');
    localStorage.removeItem('sportfit_user');
    setToken(null);
    setUser(null);
    setDashboard(null);
    setStudents([]);
    setWorkouts([]);
    setSchedule([]);
    setPayments([]);
    setProgress([]);
  };

  if (!token) {
    return (
      <div className="auth-layout">
        <div className="auth-card">
          <div className="brand-block">
            <span className="brand-mini">SportFit</span>
            <h1>Controle de academia</h1>
            <p>Gerencie alunos, treinos, agenda e pagamentos em um só lugar.</p>
          </div>

          <form onSubmit={handleLogin} className="auth-form">
            <h2>Entrar</h2>
            <label>
              Email
              <input
                type="email"
                value={loginForm.email}
                onChange={(event) => setLoginForm((prev) => ({ ...prev, email: event.target.value }))}
              />
            </label>
            <label>
              Senha
              <input
                type="password"
                value={loginForm.password}
                onChange={(event) => setLoginForm((prev) => ({ ...prev, password: event.target.value }))}
              />
            </label>

            {error && <div className="error-box">{error}</div>}

            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>

            <small className="demo-credentials">Demo: admin@sportfit.com / 123456</small>
          </form>
        </div>
      </div>
    );
  }

  if (!dashboard || loading) {
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
        <button className="logout-btn" onClick={handleLogout}>Sair</button>
      </aside>

      <main className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow">Painel administrativo</p>
            <h1>Bem-vindo, {user?.name ?? 'usuário'}</h1>
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
                      <span className={`status ${student.status.toLowerCase()}`}>
                        {student.status === 'ACTIVE' ? 'ativo' : 'inativo'}
                      </span>
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
                    <p>{workout.student?.name ?? 'Aluno'}</p>
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
                    <strong>{payment.student?.name ?? 'Aluno'}</strong>
                    <p>{payment.plan}</p>
                  </div>
                  <div className="payment-meta">
                    <span>{payment.status === 'PAID' ? 'Pago' : 'Pendente'}</span>
                    <strong>{formatCurrency(Number(payment.value))}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="panel-full">
          <div className="panel">
            <div className="panel-header">
              <h2>Evolução</h2>
              <span>Histórico</span>
            </div>
            <div className="stack-list">
              {progress.map((item) => (
                <div key={item.id} className="progress-item">
                  <div>
                    <strong>{item.student?.name ?? 'Aluno'}</strong>
                    <p>{item.date}</p>
                  </div>
                  <div className="progress-meta">
                    <span>Peso: {Number(item.weight).toFixed(1)} kg</span>
                    <span>Cintura: {item.waist} cm</span>
                    <span>Peito: {item.chest} cm</span>
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
