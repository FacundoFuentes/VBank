import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios' 
 import jwt from "jsonwebtoken" 

export const getContacts = createAsyncThunk(
  "contacts/get",
  async (thunkAPI) => {
    // call the api for get /goals
    const token = JSON.parse(localStorage.getItem("token")).data
   
    try {
      const response = await axios.get("http://localhost:3001/user/contacts", {
        headers: { Authorization: "Bearer " + token },
      });
      console.log(response.data.contacts)
      return response.data.contacts;
    } catch (error) {
      const { rejectWithValue } = thunkAPI;
      return rejectWithValue(error.response.data);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/add",
  async (payload, thunkAPI) => {
    const token = await JSON.parse(localStorage.getItem("token")).data
    if (token){
      let {username}= jwt.decode(token)
      console.log("el usuario es "+ username)
    }
    try {
      if (token){
        const response = await axios.post("http://localhost:3001/user/newcontact",payload,{
          headers: { Authorization: "Bearer " + token },
        })
        console.log(response)
  
         const { dispatch } = thunkAPI;
        dispatch(getContacts(payload));
        return;
      }
      else{
        console.log("no hay token culia")
      }
   
    } catch (error) {
      const { rejectWithValue } = thunkAPI;
      return rejectWithValue(error.response.data);
    }
  } 
);

export const deleteContact = createAsyncThunk(
  "contacts/delete",
  async (payload, thunkAPI) => {
    const token = await JSON.parse(localStorage.getItem("token")).data
     try {
       if (payload){
         const {_Id} = payload;
         await axios.delete(`http://localhost:3001/user/deletecontact/${_Id}`, {
           headers: { 
            'Content-Type': 'application/json;charset=UTF-8',
             Authorization: "Bearer " + token,
        
            },
           payload
         });
       const { dispatch } = thunkAPI;
         dispatch(getContacts(payload)); 
         return;

       }
    } catch (error) {
      const { rejectWithValue } = thunkAPI;
      return rejectWithValue(error.response.data);
    } 
  } 
);

const initContactsState = {
  contactList: [], 
  loading: "idle",
  error: null,
};

const contactsSlice = createSlice({ 
  name: "contacts",
  initialState: initContactsState,
  reducers: {},
  extraReducers: {
    [getContacts.pending]: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    [getContacts.fulfilled]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.contactList = action.payload;
      }
    },
    [getContacts.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.payload;
      }
    },
    [addContact.fulfilled]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.contactList.push(action.payload);
      }
    },
    [addContact.pending]: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    [addContact.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.payload;
      }
    },
    [deleteContact.pending]: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    [deleteContact.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.payload;
      }
    },
  },
});

export default contactsSlice.reducer;
