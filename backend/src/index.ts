import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';
import studentRoutes from './routes/students.js';
import workoutRoutes from './routes/workouts.js';
import scheduleRoutes from './routes/schedule.js';
import paymentRoutes from './routes/payments.js';
import progressRoutes from './routes/progress.js';

const app = express();
const PORT = Number(process.env.PORT ?? 3001);

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'sport-fit-api',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/progress', progressRoutes);

app.listen(PORT, () => {
  console.log(`SportFit API running on http://localhost:${PORT}`);
});
