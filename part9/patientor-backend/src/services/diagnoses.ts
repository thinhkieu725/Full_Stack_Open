import diagnosesData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getEntries = (): Diagnosis[] => {
  return diagnosesData;
};

const addDiagnose = () => {
  return null;
};

export default {
  getEntries,
  addDiagnose
};