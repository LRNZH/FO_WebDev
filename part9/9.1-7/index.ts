import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

/*
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});*/

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;

    if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
        res.status(400).json({ error: 'mal-formatted parameters' });
        return;
    }

    const bmiResult = calculateBmi(Number(height), Number(weight));

    res.json({
        weight: Number(weight),
        height: Number(height),
        bmi: bmiResult,
    });
});


app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
        res.status(400).json({ error: 'parameters missing' });
        return;
    }

    if (!Array.isArray(daily_exercises) || daily_exercises.some(isNaN) || isNaN(Number(target))) {
        res.status(400).json({ error: 'mal-formatted parameters' });
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, Number(target));
    res.json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
