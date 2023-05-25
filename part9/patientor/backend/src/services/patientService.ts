import { Diagnose, Patient, Entry } from '../types';
import diagnoses from '../../data/diagnoses';
import patients from '../../data/patients';

const getDiagnoses = (): Diagnose[] => {
    return diagnoses;
};

const getPatients = (): Patient[] => {
    return patients.map((patient) => ({
        ...patient,
        entries: patient.entries || [],
    }));
};

const getPatient = (id: string): Patient | undefined => {
    return patients.find((patient) => patient.id === id);
};

const addPatient = (patient: Patient): Patient => {
    patients.push(patient);
    return patient;
};

const addEntry = (patient: Patient, entry: Entry): Patient => {
    const updatedPatient = {
        ...patient,
        entries: [...(patient.entries || []), entry],
    };

    patients.map((p) => (p.id === updatedPatient.id ? updatedPatient : p));

    return updatedPatient;
};


export default {
    getDiagnoses,
    getPatients,
    getPatient,
    addPatient,
    addEntry,
};
