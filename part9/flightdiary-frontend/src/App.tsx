import { useState, useEffect } from "react";
import axios from "axios";

import { DiaryToDisplay, NewDiaryEntry } from "./types";

import diaryService from "./services/diaries";
import DiaryList from "./components/DiaryList";
import DiaryForm from "./components/DiaryForm";
import Notification from "./components/Notification";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryToDisplay[]>([]);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const fetchDiaries = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };
    fetchDiaries();
  }, []);

  const setNotification = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError(undefined);
    }, 5000);
  }

  const submitNewDiary = async (values: NewDiaryEntry) => {
    try {
      const diary = await diaryService.create(values);
      setDiaries(diaries.concat(diary));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setNotification(error.response?.data);
      }
    }
  }

  if (error) {
    return (
      <div>
        <Notification noti={error} />
        <h1>Add new entry</h1>
        <DiaryForm onSubmit={submitNewDiary} />
        <h1>Diaries</h1>
        <DiaryList diaries={diaries} />
      </div>
    )
  }
  
  return (
    <div>
      <h1>Add new entry</h1>
      <DiaryForm onSubmit={submitNewDiary} />
      <h1>Diaries</h1>
      <DiaryList diaries={diaries} />
    </div>
  );
};

export default App;
