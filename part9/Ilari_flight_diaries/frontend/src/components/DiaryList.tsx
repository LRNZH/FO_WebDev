import React, { useEffect, useState } from 'react';
import { DiaryEntry, NewDiaryEntry } from '../types';
import { fetchDiaries, createDiary } from '../services/api';

const DiaryList: React.FC = () => {
    const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
    const [newDiary, setNewDiary] = useState<NewDiaryEntry>({
        date: '',
        weather: 'sunny',
        visibility: 'great',
        comment: '',
    });
    const [notification, setNotification] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const diaries = await fetchDiaries();
                setDiaries(diaries);
            } catch (error) {
                console.error('Error fetching diaries:', error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setNewDiary((prevDiary) => ({
            ...prevDiary,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const createdDiary = await createDiary(newDiary);
            setDiaries((prevDiaries) => [...prevDiaries, createdDiary]);
            setNewDiary({ date: '', weather: 'sunny', visibility: 'clear', comment: '' });
            setNotification('Diary entry created successfully.');
            setTimeout(() => {
                setNotification('');
            }, 3000);
        } catch (error) {
            console.error('Error creating diary entry:', error);
            setNotification('Failed to create diary entry. Please try again.');
        }
    };

    return (
        <div className="diary-container">
            <h2>Add New Entry</h2>
            {notification && <p className="notification">{notification}</p>}
            <form onSubmit={handleSubmit} className="diary-form">
                <div className="form-row">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={newDiary.date}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-row">
                    <label htmlFor="weather">Weather:</label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="weather"
                                value="sunny"
                                checked={newDiary.weather === 'sunny'}
                                onChange={handleInputChange}
                                required
                            />
                            Sunny
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="weather"
                                value="rainy"
                                checked={newDiary.weather === 'rainy'}
                                onChange={handleInputChange}
                            />
                            Rainy
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="weather"
                                value="cloudy"
                                checked={newDiary.weather === 'cloudy'}
                                onChange={handleInputChange}
                            />
                            Cloudy
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="weather"
                                value="stormy"
                                checked={newDiary.weather === 'stormy'}
                                onChange={handleInputChange}
                                required
                            />
                            Stormy
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="weather"
                                value="windy"
                                checked={newDiary.weather === 'windy'}
                                onChange={handleInputChange}
                                required
                            />
                            Windy
                        </label>
                    </div>
                </div>
                <div className="form-row">
                    <label htmlFor="visibility">Visibility:</label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="visibility"
                                value="great"
                                checked={newDiary.visibility === 'great'}
                                onChange={handleInputChange}
                                required
                            />
                            Great
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="visibility"
                                value="good"
                                checked={newDiary.visibility === 'good'}
                                onChange={handleInputChange}
                            />
                            Good
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="visibility"
                                value="ok"
                                checked={newDiary.visibility === 'ok'}
                                onChange={handleInputChange}
                            />
                            Ok
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="visibility"
                                value="poor"
                                checked={newDiary.visibility === 'poor'}
                                onChange={handleInputChange}
                            />
                            Poor
                        </label>
                    </div>
                </div>
                <div className="form-row">
                    <label htmlFor="comment">Comment:</label>
                    <textarea
                        id="comment"
                        name="comment"
                        value={newDiary.comment}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <button type="submit">Add Entry</button>
            </form>
            <h2>Diary Entries</h2>
            <div className="diary-list">
                {diaries.map((diary) => (
                    <div key={diary.id} className="diary-entry">
                        <h3>Date: {diary.date}</h3>
                        <p>Weather: {diary.weather}</p>
                        <p>Visibility: {diary.visibility}</p>
                        <p>Comment: {diary.comment}</p>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DiaryList;
