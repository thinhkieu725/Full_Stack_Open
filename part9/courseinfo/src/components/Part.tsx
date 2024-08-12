import { CoursePart } from "../types"

export interface PartProps {
  part: CoursePart;
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}

const Part = (props: PartProps): JSX.Element => {
  switch (props.part.kind) {
    case "basic":
      return (
        <div>
          <p>
            <strong>{props.part.name} {props.part.exerciseCount}</strong> <br />
            {props.part.description}
          </p>
        </div>
      );
    case "group":
      return (
        <div>
          <p>
            <strong>{props.part.name} {props.part.exerciseCount}</strong> <br />
            project exercises {props.part.groupProjectCount}
          </p>
        </div>
      );
    case "background":
      return (
        <div>
          <p>
            <strong>{props.part.name} {props.part.exerciseCount}</strong> <br />
            {props.part.description} <br />
            required background: {props.part.backgroundMaterial}
          </p>
        </div>
      );
    case "special":
      return (
        <div>
          <p>
            <strong>{props.part.name} {props.part.exerciseCount}</strong> <br />
            {props.part.description} <br />
            required skills: {props.part.requirements.join(", ")}
          </p>
        </div>
      );
    default:
      return assertNever(props.part);
  }
}

export default Part;