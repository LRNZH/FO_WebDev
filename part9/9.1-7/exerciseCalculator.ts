export interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (exerciseHours: number[], target: number): ExerciseResult => {
    const periodLength = exerciseHours.length;
    const trainingDays = exerciseHours.filter(hours => hours > 0).length;
    const totalHours = exerciseHours.reduce((acc, hours) => acc + hours, 0);
    const average = totalHours / periodLength;
    const success = average >= target;

    let rating = 1;
    let ratingDescription = 'needs improvement';

    if (average >= target) {
        rating = 3;
        ratingDescription = 'excellent';
    } else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

/*const args = process.argv.slice(2);
const targetHours = Number(args[0]);
const exerciseHours = args.slice(1).map(Number);

if (isNaN(targetHours) || exerciseHours.some(isNaN)) {
    console.log('Error: Invalid arguments. Please provide a target value followed by exercise hours.');
    process.exit(1);
}

const result = calculateExercises(exerciseHours, targetHours);
console.log(result);*/