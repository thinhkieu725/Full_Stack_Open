import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = ({}) => {
  const dispatch = useDispatch();

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    dispatch(setFilter(filter));
  }

  return (
    <div>
      <input type="text" placeholder="Search..." onChange={handleFilterChange}/>
    </div>
  );
}

export default Filter;