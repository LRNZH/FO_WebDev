import React from 'react';
import { Entry, Diagnosis, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../types';
import { ListItem, ListItemText } from '@mui/material';
import { Grade, LocalHospital, Work } from '@mui/icons-material';

interface EntryDetailsProps {
    entry: Entry;
    diagnoses: Diagnosis[];
}

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry, diagnoses }) => {
    const formatDate = (date: string) => new Date(date).toLocaleDateString();

    const getDiagnosis = (code: string): Diagnosis | undefined => {
        return diagnoses.find((diagnosis) => diagnosis.code === code);
    };

    let entryDetails: React.ReactNode;
    let icon: React.ReactNode;

    if (entry.type === 'HealthCheck') {
        const healthCheckEntry = entry as HealthCheckEntry;
        entryDetails = (
            <>
                <div>
                    <ListItemText primary={`${formatDate(entry.date)} - Health Check`} />
                    <ListItemText secondary={`Description: ${healthCheckEntry.description}`} />
                    <ListItemText secondary={`Diagnosed by: ${healthCheckEntry.specialist}`} />
                    {healthCheckEntry.healthCheckRating > -1 && (<ListItemText secondary={`Health Check Rating: ${healthCheckEntry.healthCheckRating}`} />)}
                    {healthCheckEntry.diagnosisCodes && (<ListItemText
                        secondary={`Diagnosis Codes: ${healthCheckEntry.diagnosisCodes
                            ?.map((code) => {
                                const diagnosis = getDiagnosis(code);
                                return diagnosis ? `${diagnosis.code} - ${diagnosis.name}` : code;
                            })
                            .join('; ')}`}
                    />)}
                </div>
            </>
        );
        icon = <Grade />;
    } else if (entry.type === 'Hospital') {
        const hospitalEntry = entry as HospitalEntry;
        entryDetails = (
            <>
                <div>
                    <ListItemText primary={`${formatDate(entry.date)} - Hospital`} />
                    <ListItemText secondary={`Description: ${hospitalEntry.description}`} />
                    <ListItemText secondary={`Diagnosed by: ${hospitalEntry.specialist}`} />
                    {hospitalEntry.healthCheckRating > -1 && (<ListItemText secondary={`Health Check Rating: ${hospitalEntry.healthCheckRating}`} />)}
                    {hospitalEntry.diagnosisCodes && (<ListItemText
                        secondary={`Diagnosis Codes: ${hospitalEntry.diagnosisCodes
                            ?.map((code) => {
                                const diagnosis = getDiagnosis(code);
                                return diagnosis ? `${diagnosis.code} - ${diagnosis.name}` : code;
                            })
                            .join('; ')}`}
                    />)}
                    {hospitalEntry.discharge && (
                        <ListItemText secondary={`Discharge Date: ${hospitalEntry.discharge.date}`} />
                    )}
                    {hospitalEntry.discharge && (
                        <ListItemText secondary={`Discharge Criteria: ${hospitalEntry.discharge.criteria}`} />
                    )}
                </div>
            </>
        );
        icon = <LocalHospital />;
    } else if (entry.type === 'OccupationalHealthcare') {
        const occupationalHealthcareEntry = entry as OccupationalHealthcareEntry;
        entryDetails = (
            <>
                <div>
                    <ListItemText primary={`${formatDate(entry.date)} - Occupational Healthcare`} />
                    <ListItemText secondary={`Employer Name: ${occupationalHealthcareEntry.employerName}`} />
                    <ListItemText secondary={`Description: ${occupationalHealthcareEntry.description}`} />
                    <ListItemText secondary={`Diagnosed by: ${occupationalHealthcareEntry.specialist}`} />
                    {occupationalHealthcareEntry.healthCheckRating > -1 && (<ListItemText secondary={`Health Check Rating: ${occupationalHealthcareEntry.healthCheckRating}`} />)}
                    {occupationalHealthcareEntry.diagnosisCodes && (<ListItemText
                        secondary={`Diagnosis Codes: ${occupationalHealthcareEntry.diagnosisCodes
                            ?.map((code) => {
                                const diagnosis = getDiagnosis(code);
                                return diagnosis ? `${diagnosis.code} - ${diagnosis.name}` : code;
                            })
                            .join('; ')}`}
                    />)}
                    {occupationalHealthcareEntry.sickLeave && (
                        <ListItemText
                            secondary={`Sick Leave: ${occupationalHealthcareEntry.sickLeave.startDate} - ${occupationalHealthcareEntry.sickLeave.endDate}`}
                        />
                    )}
                </div>
            </>
        );
        icon = <Work />;
    }

    return (
        <ListItem>
            {icon && <div>{icon}</div>}
            {entryDetails}
        </ListItem>
    );
};

export default EntryDetails;
