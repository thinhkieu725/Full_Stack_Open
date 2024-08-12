import express from 'express';

import diagnosesService from '../services/diagnoses';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosesService.getEntries());
});

export default router;