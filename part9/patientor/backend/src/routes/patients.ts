import express from 'express';
import patientService from '../services/patientService';
import { v4 as uuid } from 'uuid';
import {
    Patient,
    NonSensitivePatient,
} from '../types';
import { toNewPatientEntry, toNewEntry } from '../utils';

const router = express.Router();

router.get('/patients', (_req, res) => {
    const patients = patientService
        .getPatients()
        .map(({ id, name, dateOfBirth, gender, occupation }) => ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
        }));

    res.json(patients);
});

router.get('/patients/:id', (req, res) => {
    const { id } = req.params;
    const patient = patientService.getPatients().find((p) => p.id === id);

    if (patient) {
        res.json(patient);
    } else {
        res.status(404).json({ error: 'Patient not found' });
    }
});

router.get('/diagnoses', (_req, res) => {
    res.json(patientService.getDiagnoses());
});

router.post('/patients', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const newPatient: Patient = {
            id: uuid(),
            name: newPatientEntry.name,
            dateOfBirth: newPatientEntry.dateOfBirth,
            ssn: newPatientEntry.ssn,
            gender: newPatientEntry.gender,
            occupation: newPatientEntry.occupation,
            entries: [],
        };
        const addedPatient: NonSensitivePatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error) {
        res.status(400).send((error as Error).message);
    }
});

router.post('/patients/:id/entries', (req, res) => {
    const { id } = req.params;
    const patient = patientService.getPatient(id);

    if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
    }

    try {
        const newEntry = toNewEntry(req.body);

        const updatedPatient = patientService.addEntry(patient, newEntry);

        return res.json(updatedPatient);
    } catch (error) {
        return res.status(400).send((error as Error).message);
    }
});

export default router;

