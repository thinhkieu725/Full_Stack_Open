interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyExerciseHours: string[], target: string): ExerciseResult => {
  if (dailyExerciseHours.length === 0) {
    throw new Error('Provided values were empty!');
  }
  const dailyExerciseHoursNumbers = dailyExerciseHours.map(hours => Number(hours));
  const targetNumber = Number(target);

  dailyExerciseHoursNumbers.forEach(hours => {
    if (isNaN(hours)) {
      throw new Error('Provided values were not numbers!');
    }
    if (hours < 0) {
      throw new Error('Provided values were negative!');
    }
  });
  if (isNaN(targetNumber)) {
    throw new Error('Provided values were not numbers!');
  }
  if (targetNumber < 0) {
    throw new Error('Provided values were negative!');
  }

  const periodLength = dailyExerciseHoursNumbers.length;
  const trainingDays = dailyExerciseHoursNumbers.filter(hours => hours > 0).length;
  const average = dailyExerciseHoursNumbers.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= targetNumber;
  let rating = 0;
  let ratingDescription = '';
  if (average < targetNumber) {
    rating = 1;
    ratingDescription = 'not too bad but could be better';
  } else if (average === targetNumber) {
    rating = 2;
    ratingDescription = 'good job';
  } else {
    rating = 3;
    ratingDescription = 'excellent';
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetNumber,
    average
  };
};

export { calculateExercises };

/*
if (process.argv.length != 4) {
  throw new Error('Invalid number of arguments');
}

// Parse the JSON string into an array
const arrayArg = process.argv[2];
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const array = JSON.parse(arrayArg);

// Verify it's an array
if (!Array.isArray(array)) {
  throw new Error('The provided values were not an array!');
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
console.log(calculateExercises(array, process.argv[3]));
*/