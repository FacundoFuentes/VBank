import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
    status: "",
  },
  reducers: {}, // actions creators
  extraReducers: {},
});

export default userSlice.reducer;
