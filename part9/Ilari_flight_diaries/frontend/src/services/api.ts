import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';

const API_URL = 'http://localhost:3001/api';

export const fetchDiaries = async (): Promise<DiaryEntry[]> => {
    try {
        const response = await axios.get<DiaryEntry[]>(`${API_URL}/diaries`);
        return response.data;
    } catch (error) {
        console.error('Error fetching diaries:', error);
        throw error;
    }
};

export const createDiary = async (newDiary: NewDiaryEntry): Promise<DiaryEntry> => {
    try {
        const response = await axios.post<DiaryEntry>(`${API_URL}/diaries`, newDiary);
        return response.data;
    } catch (error) {
        console.error('Error creating diary entry:', error);
        throw error;
    }
};
