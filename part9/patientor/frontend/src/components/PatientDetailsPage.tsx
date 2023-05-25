import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, TextField, Button, Snackbar, AlertColor, MenuItem, Select } from '@mui/material';
import { Alert } from '@mui/material';
import Man2Icon from '@mui/icons-material/Man2';
import Woman2Icon from '@mui/icons-material/Woman2';
import TransgenderIcon from '@mui/icons-material/Transgender';
import EntryDetails from './EntryDetails';

import patientService from '../services/patients';
import { Patient, Entry, Diagnosis, NewEntry, HealthCheckRating } from '../types';

interface RouteParams {
    id?: string;
    [key: string]: string | undefined;
}

const PatientDetailsPage: React.FC = () => {
    const { id } = useParams<RouteParams>();
    const [patient, setPatient] = useState<Patient | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    const [newEntry, setNewEntry] = useState<NewEntry>({
        type: 'OccupationalHealthcare',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        employerName: '',
        healthCheckRating: HealthCheckRating.Healthy,
    });

    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');

    useEffect(() => {
        const fetchPatient = async () => {
            if (id) {
                try {
                    const fetchedPatient = await patientService.getById(id);
                    setPatient(fetchedPatient);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        void fetchPatient();
    }, [id]);

    useEffect(() => {
        const fetchDiagnoses = async () => {
            try {
                const fetchedDiagnoses = await patientService.getDiagnoses();
                setDiagnoses(fetchedDiagnoses);
            } catch (error) {
                console.error(error);
            }
        };

        void fetchDiagnoses();
    }, []);

    if (!patient) {
        return <Typography variant="h6">Patient not found</Typography>;
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        let entry: Entry;
        switch (newEntry.type) {
            case 'HealthCheck':
                entry = {
                    ...newEntry,
                    id: String(Date.now()),
                    type: 'HealthCheck',
                    healthCheckRating: HealthCheckRating.Healthy,
                };
                break;
            case 'OccupationalHealthcare':
                entry = {
                    ...newEntry,
                    id: String(Date.now()),
                    type: 'OccupationalHealthcare',
                };
                break;
            case 'Hospital':
                entry = {
                    ...newEntry,
                    id: String(Date.now()),
                    type: 'Hospital',
                    discharge: {
                        date: '',
                        criteria: '',
                    },
                };
                break;
            default:
                throw new Error(`Invalid entry type`);
        }

        try {
            const updatedPatient = await patientService.addEntryToPatient(patient.id, entry);
            setPatient(updatedPatient);
            setNewEntry({
                type: 'OccupationalHealthcare',
                description: '',
                date: '',
                specialist: '',
                diagnosisCodes: [],
                employerName: '',
                healthCheckRating: HealthCheckRating.Healthy,
            });
            setShowSnackbar(true);
            setSnackbarMessage('Entry added successfully');
            setSnackbarSeverity('success');
        } catch (error) {
            console.error(error);
            setShowSnackbar(true);
            setSnackbarMessage('Failed to add entry');
            setSnackbarSeverity('error');
        }
    };

    const handleCloseSnackbar = () => {
        setShowSnackbar(false);
    };

    return (
        <div>
            <Typography variant="h3">
                {patient.name}
                {patient.gender === 'male' && <Man2Icon fontSize="inherit" sx={{ verticalAlign: 'middle', marginLeft: '5px' }} />}
                {patient.gender === 'female' && <Woman2Icon fontSize="inherit" sx={{ verticalAlign: 'middle', marginLeft: '5px' }} />}
                {patient.gender === 'other' && <TransgenderIcon fontSize="inherit" sx={{ verticalAlign: 'middle', marginLeft: '5px' }} />}
            </Typography>
            <Typography variant="body1">SSN: {patient.ssn}</Typography>
            <Typography variant="body1">Occupation: {patient.occupation}</Typography>

            <Typography variant="h4" sx={{ marginTop: '20px' }}>
                Entries
            </Typography>
            {patient.entries.length === 0 ? (
                <Typography variant="body1">No entries</Typography>
            ) : (
                <List>
                    {patient.entries.map((entry: Entry) => (
                        <ListItem key={entry.id}>
                            <ListItemText primary={<EntryDetails entry={entry} diagnoses={[]} />} />
                        </ListItem>
                    ))}
                </List>
            )}

            <Typography variant="h4" sx={{ marginTop: '20px' }}>
                Add New Entry
            </Typography>
            <form onSubmit={handleSubmit}>
                <Select
                    value={newEntry.type}
                    onChange={(event) => {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const selectedType = event.target.value as NewEntry['type'];
                        setNewEntry({
                            ...newEntry,
                            //type: selectedType,
                        });
                    }}
                    sx={{ marginTop: '10px', marginBottom: '20px' }}
                >
                    <MenuItem value="HealthCheck">Health Check</MenuItem>
                    <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
                    <MenuItem value="Hospital">Hospital</MenuItem>
                </Select>
                <TextField
                    label="Description"
                    value={newEntry.description}
                    onChange={(event) => setNewEntry({ ...newEntry, description: event.target.value })}
                    required
                    fullWidth
                    sx={{ marginBottom: '10px' }}
                />
                <TextField
                    label="Date"
                    type="date"
                    value={newEntry.date}
                    onChange={(event) => setNewEntry({ ...newEntry, date: event.target.value })}
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginBottom: '10px' }}
                />
                <TextField
                    label="Specialist"
                    value={newEntry.specialist}
                    onChange={(event) => setNewEntry({ ...newEntry, specialist: event.target.value })}
                    required
                    fullWidth
                    sx={{ marginBottom: '10px' }}
                />
                {newEntry.type === 'HealthCheck' && (
                    <Select
                        value={newEntry.healthCheckRating}
                        onChange={(event) =>
                            setNewEntry({ ...newEntry, healthCheckRating: event.target.value as HealthCheckRating })
                        }
                        sx={{ marginTop: '10px', marginBottom: '20px' }}
                    >
                        <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
                        <MenuItem value={HealthCheckRating.LowRisk}>Low Risk</MenuItem>
                        <MenuItem value={HealthCheckRating.HighRisk}>High Risk</MenuItem>
                        <MenuItem value={HealthCheckRating.CriticalRisk}>Critical Risk</MenuItem>
                    </Select>
                )}
                <Button type="submit" variant="contained" color="primary">
                    Add Entry
                </Button>
            </form>

            <Snackbar open={showSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default PatientDetailsPage;
