import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
  courseParts: CoursePart[];
};

const Content = (props: ContentProps): JSX.Element => {
  return (
    <div>
      {props.courseParts.map(part => 
        <Part key={part.name} part={part} />
      )}
    </div>
  );
};

export default Content;