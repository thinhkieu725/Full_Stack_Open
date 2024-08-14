import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../services/patients';
import diagnosesService from '../services/diagnoses';
import { Patient, Diagnosis } from '../types';
import { Typography } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

const PatientDetailsPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async (): Promise<void> => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };

    void fetchDiagnoses();
  }, []);

  const fetchPatient = async (): Promise<void> => {
    if (!id) {
      throw new Error('Fetching patient failed. No id provided.');
    }
    const patient = await patientService.getOne(id);
    setPatient(patient);
  };

  void fetchPatient();
  if (!patient) {
    return <div>Loading...</div>;
  }

  const genderIcon = patient.gender.toString() == "male" ? <MaleIcon /> : <FemaleIcon />;

  return (
    <div>
      <Typography variant="h4" style={{ marginTop: "0.5em", marginBottom: "0.5em" }}>
        {patient.name} {genderIcon}
      </Typography>
      <Typography variant="body1" style={{ marginBottom: "0.5em" }}>
        <strong>ssn:</strong> {patient.ssn} <br />
        <strong>occupation:</strong> {patient.occupation}
      </Typography>
      <Typography variant="h5" style={{ marginBottom: "0.5em" }}>
        entries
      </Typography>
      <ul>
        {patient.entries.map((entry) => (
          <li key={entry.id}>
            {entry.date} <i>{entry.description}</i>
            <ul>
              {entry.diagnosisCodes?.map((code) => (
                <li key={code}>
                  {code} &nbsp
                  {diagnoses.find((d) => d.code === code)?.name}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientDetailsPage;