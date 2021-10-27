import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios' 



const userInfoString= localStorage.getItem('user_info');
const currentUserInfo= userInfoString ? JSON.parse(userInfoString) : null; 
// si hay un infoString, lo vuelvo a convertir a obj porque lo necesito asi, si no, quiere decir que  no hay un usuario registradoo

const initUserState={
    loggedInUser:currentUserInfo, // lo hago asi para que pueda ser nulo  o mantenga cualquier info de usuario
    registerState: {loading: "idle", error:null, currentRequestID: undefined}, //para asegurarme que no haya multiples request desde un mismo usuario
    signinState: {loading: "idle", error:null, currentRequestID: undefined},
    
}

export const registerUser= createAsyncThunk("user/register", async (userInfo,thunkAPI)=>{
    //manejo de errores antes de hacer la peticion
    const {loading, currentRequestID} = thunkAPI.getState().user.registerState;
    if (loading !== "pending" || thunkAPI.requestId !== currentRequestID){
        return
    }
    try { 
        const response = await axios.post('http://localhost:3001/user/register', userInfo)
    
        localStorage.setItem('user_info', JSON.stringify(response.data.data))
        return response.data;
        
    } catch (error) {
        const {rejectWithValue}= thunkAPI;
        return rejectWithValue(error.response.data);
    }
})

const userSlice = createSlice({
  name: 'user',
  initialState: initUserState,
  reducers: {// no necesito escribir funciones para los actions creator porque create Slice crea las accjiones automaticamente para cada reduce
      logoutUser: (state) => {
          state.loggedInUser = null;
          localStorage.removeItem('user_info');
      },
     
  },
  extraReducers: {
      [registerUser.pending]: (state,action)=>{
      const {registerState} = state;
      if(registerState.loading === "idle"){
          registerState.loading = "pending"
          registerState.currentRequestID = action.meta.requestId
      }
      },
      [registerUser.fulfilled]: (state,action)=>{
          const {registerState} = state;
          if(registerState.loading === "pending"){
              registerState.loading = "idle"
              registerState.currentRequestID = undefined;
              registerState.error= null;
              state.loggedInUser= action.payload
          }
          },
      [registerUser.rejected]: (state,action)=>{
          const {registerState} = state;
          if(registerState.loading === "pending"){
              registerState.loading="idle"// seteo el loading como terminado
              registerState.currentRequestID = undefined;
              registerState.error = action.payload; //envio el error
          }
      },
     
      
  
  }
})


export const {logoutUser} = userSlice.actions;
export default  userSlice.reducer;




