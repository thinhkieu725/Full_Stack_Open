import diagnosesData from '../../data/diagnoses';
import { Diagnose } from '../types';

const getEntries = (): Diagnose[] => {
  return diagnosesData;
};

const addDiagnose = () => {
  return null;
};

export default {
  getEntries,
  addDiagnose
};