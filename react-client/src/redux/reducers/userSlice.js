import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
/* import axios from 'axios' */



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
