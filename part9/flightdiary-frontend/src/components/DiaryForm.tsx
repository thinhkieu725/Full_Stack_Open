import { ChangeEvent, SyntheticEvent, useState } from "react";

import { NewDiaryEntry, Visibility, Weather } from "../types";

interface DiaryFormProps {
  onSubmit: (values: NewDiaryEntry) => void;
}

const DiaryForm = ({ onSubmit }: DiaryFormProps): JSX.Element  => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState(Visibility.Great);
  const [weather, setWeather] = useState(Weather.Sunny);
  const [comment, setComment] = useState("");

  const onVisibilityChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setVisibility(event.target.value as Visibility);
  }

  const onWeatherChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setWeather(event.target.value as Weather);
  }

  const addDiary = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      date,
      visibility,
      weather,
      comment
    });
  }

  return (
    <form onSubmit={addDiary}>
      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <br />
      <label>
        Visibility:
        Great<input type="radio" id="great" name="visibility" value="email" onChange={onVisibilityChange} checked />
        Good<input type="radio" id="good" name="visibility" value="good" onChange={onVisibilityChange} />
        OK<input type="radio" id="ok" name="visibility" value="ok" onChange={onVisibilityChange} />
        Poor<input type="radio" id="poor" name="visibility" value="poor" onChange={onVisibilityChange} />
      </label>
      <br />
      <label>
        Weather:
        Sunny<input type="radio" id="sunny" name="weather" value="sunny" onChange={onWeatherChange} checked />
        Rainy<input type="radio" id="rainy" name="weather" value="rainy" onChange={onWeatherChange} />
        Cloudy<input type="radio" id="cloudy" name="weather" value="cloudy" onChange={onWeatherChange} />
        Stormy<input type="radio" id="stormy" name="weather" value="stormy" onChange={onWeatherChange} />
        Windy<input type="radio" id="windy" name="weather" value="windy" onChange={onWeatherChange} />
      </label>
      <br />
      <label>
        Comment:
        <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
      </label>
      <br />
      <button type="submit">Add</button>
    </form>
  )
}

export default DiaryForm;