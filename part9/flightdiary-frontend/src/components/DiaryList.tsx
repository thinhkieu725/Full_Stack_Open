import Diary from "./Diary";
import { DiaryToDisplay as DiaryProps } from '../types';

interface DiaryListProps {
  diaries: DiaryProps[];
}

const DiaryList = (props: DiaryListProps): JSX.Element => {
  return (
    <div>
      {props.diaries.map((diary) => (
        <Diary key={diary.id} {...diary} />
      ))}
    </div>
  );
}

export default DiaryList;