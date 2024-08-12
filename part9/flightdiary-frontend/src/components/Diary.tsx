import { DiaryToDisplay as DiaryProps } from '../types';

const Diary = (props: DiaryProps): JSX.Element => {
  return (
    <div>
      <h3>{props.date}</h3>
      <p>
        Weather: {props.weather}<br/>
        Visibility: {props.visibility}
      </p>
    </div>
  );
}

export default Diary;