import { createSlice } from "@reduxjs/toolkit";

const initialNotificationState = { show: false, type: "info", message: "" };

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialNotificationState,
  reducers: {
    setError(state) {
      state.type = "error";
      state.message = "Something went wrong! Your message didn't send.";
      state.show = true;
    },
    setSuccess(state) {
      state.type = "success";
      state.message = "Message sent successfully!";
      state.show = true;
    },
    setInfo(state) {
      state.type = "info";
      state.message = "Sending...";
      state.show = true;
    },
    toggleNotification(state) {
      state.show = !state.show;
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice.reducer;
