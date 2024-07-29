import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight) {
    res.status(400).send({ error: 'malformatted parameters' });
  }
  try {
    const bmi = calculateBmi(height as string, weight as string);
    res.json({ weight, height, bmi });
  } catch (error) {
    res.status(400).send({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.status(400).send({ error: 'parameters missing' });
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, target);
    res.json(result);
  } catch (error) {
    res.status(400).send({ error: 'malformatted parameters' });
  }
});

app.use(express.json());

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});