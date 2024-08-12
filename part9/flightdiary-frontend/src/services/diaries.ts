import axios from "axios";

import { apiBaseUrl } from "../constants";
import { DiaryToDisplay, NewDiaryEntry, Diary } from "../types";

const getAll = async () => {
  const { data } = await axios.get<DiaryToDisplay[]>(apiBaseUrl);
  return data;
}

const create = async (diary: NewDiaryEntry) => {
  const response = await axios.post<Diary>(apiBaseUrl, diary);
  return response.data;
}

export default { getAll, create };