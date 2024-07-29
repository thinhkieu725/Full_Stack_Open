const calculateBmi = (height: string, weight: string): string => {
  const heightNumber = Number(height);
  const weightNumber = Number(weight);
  if (isNaN(heightNumber) || isNaN(weightNumber)) {
    throw new Error('Provided values were not numbers!');
  }

  const bmi = weightNumber / Math.pow(heightNumber / 100, 2);
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

/*
if (process.argv.length != 4) {
  throw new Error('Invalid number of arguments!');
}
console.log(calculateBmi(process.argv[2], process.argv[3]));
*/

export { calculateBmi };