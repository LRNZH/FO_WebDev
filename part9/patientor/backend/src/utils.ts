import { Gender, Patient, Entry } from "./types";
import { v4 as uuid } from 'uuid';

export const toNewPatientEntry = (object: any): Patient => {
    const newPatient: Patient = {
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
        id: ""
    };

    return newPatient;
};

export const toNewEntry = (object: any): Entry => {
    const baseEntry: Omit<Entry, 'id'> = {
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        description: parseString(object.description),
        diagnosisCodes: parseDiagnosisCodes(object),
        type: "Hospital"
    };

    const type = parseType(object.type);

    switch (type) {
        case 'HealthCheck':
            return {
                ...baseEntry,
                id: uuid(),
                type,
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
            };
        case 'Hospital':
            return {
                ...baseEntry,
                id: uuid(),
                type,
                discharge: parseDischarge(object.discharge),
            };
        case 'OccupationalHealthcare':
            return {
                ...baseEntry,
                id: uuid(),
                type,
                employerName: parseString(object.employerName),
                sickLeave: object.sickLeave
                    ? parseSickLeave(object.sickLeave)
                    : undefined,
            };
        default:
            throw new Error(`Invalid entry type: ${type}`);
    }
};

const parseString = (value: any): string => {
    if (!value || !isString(value)) {
        throw new Error("Invalid or missing string value: " + value);
    }
    return value;
};

const parseDate = (value: any): string => {
    if (!value || !isString(value) || !isDate(value)) {
        throw new Error("Invalid or missing date: " + value);
    }
    return value;
};

const parseType = (value: any): string => {
    if (!value || !isString(value) || !isEntryType(value)) {
        throw new Error("Invalid or missing entry type: " + value);
    }
    return value;
};

const parseHealthCheckRating = (value: any): number => {
    if (value === undefined || !isNumber(value)) {
        throw new Error("Invalid or missing health check rating: " + value);
    }
    return value;
};

const parseDischarge = (value: any): { date: string; criteria: string } => {
    if (!value || typeof value.date !== 'string' || typeof value.criteria !== 'string') {
        throw new Error("Invalid or missing discharge value: " + value);
    }
    return value;
};

const parseSickLeave = (value: any): { startDate: string; endDate: string } => {
    if (!value || typeof value.startDate !== 'string' || typeof value.endDate !== 'string') {
        throw new Error("Invalid or missing sick leave value: " + value);
    }
    return value;
};

const isString = (value: any): value is string => {
    return typeof value === "string" || value instanceof String;
};

const isDate = (value: string): boolean => {
    return Boolean(Date.parse(value));
};

const isNumber = (value: any): value is number => {
    return typeof value === "number" || value instanceof Number;
};

const isEntryType = (value: any): boolean => {
    return value === "HealthCheck" || value === "Hospital" || value === "OccupationalHealthcare";
};

function parseGender(_gender: any): Gender {
    throw new Error("Function not implemented.");
}


function parseDiagnosisCodes(_object: any): string[] | undefined {
    throw new Error("Function not implemented.");
}
