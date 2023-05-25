import axios from "axios";
import { Diagnosis, Entry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";


const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getDiagnoses = async () => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`
  );

  return data;
};


const getById = async (id: string): Promise<Patient | null> => {
  try {
    const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addEntryToPatient = async (patientId: string, entry: Entry): Promise<Patient> => {
  const response = await axios.post<Patient>(`${apiBaseUrl}/patients/${patientId}/entries`, entry);
  return response.data;
};


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, getDiagnoses, getById, create, addEntryToPatient
};

