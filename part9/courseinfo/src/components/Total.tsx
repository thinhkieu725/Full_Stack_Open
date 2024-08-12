interface TotalProps {
  totalExercises: number;
};

const Total = (props: TotalProps): JSX.Element => {
  return (
    <p>
      Number of exercises {props.totalExercises}
    </p>
  );
};

export default Total;