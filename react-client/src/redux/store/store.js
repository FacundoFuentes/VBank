import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../reducers/userSlice";

import contactsReducer from  "../reducers/ContactSlice"
export const store = configureStore({
  reducer: {
    user: userReducer,
    contacts: contactsReducer,
  },
});
