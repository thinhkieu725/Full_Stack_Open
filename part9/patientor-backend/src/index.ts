import express from 'express';
import cors from 'cors';

import diagonosesRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/diagnoses', diagonosesRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});