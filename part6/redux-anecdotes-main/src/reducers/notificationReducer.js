import { createSlice } from "@reduxjs/toolkit"

const notificationReducer = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification(state) {
      return ""
    }
  }
})

export const { setNotification, removeNotification } = notificationReducer.actions

export const showNotification = (message, time) => {
  return async dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export default notificationReducer.reducer
  