import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios' 
import jwt from "jsonwebtoken"



const userInfoString = localStorage.getItem('token');
const currentUserInfo= userInfoString ? JSON.parse(userInfoString) : null; 
// si hay un infoString, lo vuelvo a convertir a obj porque lo necesito asi, si no, quiere decir que  no hay un usuario registrado






const initUserState={
    loggedInUser:currentUserInfo, // lo hago asi para que pueda ser nulo  o mantenga cualquier info de usuario
    registerState: {loading: "idle", error:null, currentRequestID: undefined}, //para asegurarme que no haya multiples request desde un mismo usuario
    signinState: {loading: "idle", error:null, currentRequestID: undefined},
    userInfo: {info:null, loading: "idle", error:null, currentRequestID: undefined},
    userAccountInfo: {info:null, loading: "idle", error:null, currentRequestID: undefined},
    userBalance: {info:null, loading: "idle", error:null, currentRequestID: undefined},
    contacts:[]
    
}

export const registerUser= createAsyncThunk("user/register", async (userInfo,thunkAPI)=>{
    //manejo de errores antes de hacer la peticion
    const {loading, currentRequestID} = thunkAPI.getState().user.registerState;
    if (loading !== "pending" || thunkAPI.requestId !== currentRequestID){
        return
    }
    try { 

        const response = await axios.post('http://localhost:3001/user/register', userInfo)
        return response.data;
        
    } catch (error) {
        const {rejectWithValue}= thunkAPI;
        return rejectWithValue(error.response.data);
    }
})

export const getUserInfo = createAsyncThunk("user/Info", async (payload, thunkAPI) =>{//////
  const token = JSON.parse(localStorage.getItem("token")).data
  let {username} = jwt.decode(token)

  try {
    const response = await axios.post("http://localhost:3001/user/userinfo", {username:username},{
      headers: { Authorization: "Bearer " + token },
    })
    return response.data
  } catch (error) {
    const {rejectWithValue}= thunkAPI;
    return rejectWithValue(error.response.data);
   
  }
})
export const getUserAccountInfo = createAsyncThunk("user/AccountInfo", async (payload, thunkAPI) =>{//////
  const token = JSON.parse(localStorage.getItem("token")).data
  let {username} = jwt.decode(token)

  try {
    const response = await axios.post("http://localhost:3001/user/useraccountinfo", {username:username},{
      headers: { Authorization: "Bearer " + token },
    })
    return response.data

  } catch (error) {
    console.log(error.response.data.data)
    console.log("entro al catch")
    const {rejectWithValue}= thunkAPI;
    return rejectWithValue(error.response.data);
    /* if(error.response.data.data === 'Unauthorized') {
      localStorage.removeItem('token')
      alert('Session expired, You must sign in again')
      window.location.href = 'http://localhost:3000/'
  } */
  }
})
export const getBalance = createAsyncThunk("user/balance", async (payload,thunkAPI) =>{//////
  const token = JSON.parse(localStorage.getItem("token")).data
  let {username} = jwt.decode(token)

  try {
    const response = await axios.post("http://localhost:3001/transactions", {username:username},{
      headers: { Authorization: "Bearer " + token },
    })
    return response.data
  } catch (error) {
    const {rejectWithValue}= thunkAPI;
    return rejectWithValue(error.response.data);
  }
})

export const signinUser= createAsyncThunk("user/login", async (userInfo,thunkAPI)=>{
    //manejo de errores
    const {loading, currentRequestID} = thunkAPI.getState().user.signinState;
    if (loading !== "pending" || thunkAPI.requestId !== currentRequestID){
        return
    }
    try { // hago la llamada a la API to /register
        const response = await axios.post("http://localhost:3001/user/login", userInfo)
        //aca uso el local storage para mantener al usuario 
        // como el response es un objeto, lo tengo que stringifiar
        localStorage.setItem('token', JSON.stringify(response.data))
   
        return response.data;
        
    } catch (error) {
        const {rejectWithValue}= thunkAPI;
        console.log(error.response.data)
        return rejectWithValue(error.response.data);
    }
})

const userSlice = createSlice({
  name: 'user',
  initialState: initUserState,
  reducers: {// no necesito escribir funciones para los actions creator porque create Slice crea las accjiones automaticamente para cada reduce
      logoutUser: (state) => {
          state.loggedInUser = null;
          localStorage.removeItem('token');
      },
      resetRegisterState: (state) => {
        state.registerState = initUserState.registerState;
      },
      resetSigninState: (state) => {
        state.signinState = initUserState.signinState;
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
            //   state.loggedInUser= action.payload  Me devuleve al landing de esta manera
          }
          },
      [registerUser.rejected]: (state,action)=>{
          const {registerState} = state;
          if(registerState.loading === "pending"){
              registerState.loading="idle"// seteo el loading como terminado
              registerState.currentRequestID = undefined;
              registerState.error = action.payload.data; //envio el error
              console.log( registerState.error = action.payload.data )
          }
      },
      [signinUser.pending]: (state,action)=>{
        const {signinState} = state;
        if(signinState.loading === "idle"){
            signinState.loading = "pending"
            signinState.currentRequestID = action.meta.requestId
        }
        },
        [signinUser.fulfilled]: (state,action)=>{
            const {signinState} = state;
            if(signinState.loading === "pending"){
                signinState.loading = "idle"
                signinState.currentRequestID = undefined;
                signinState.error= null;
                state.loggedInUser= action.payload
            }
            },
        [signinUser.rejected]: (state,action)=>{
            const {signinState} = state;
            if(signinState.loading === "pending"){
                signinState.loading="idle"// seteo el loading como terminado
                signinState.currentRequestID = undefined;
                signinState.error = action.payload; //envio el error
            }
        },
        [getUserInfo.pending]: (state,action)=>{
          let {userInfo} = state;
          if(userInfo.loading === "idle"){
              userInfo.loading = "pending"
              userInfo.currentRequestID = action.meta.requestId
          }
          },
          [getUserInfo.fulfilled]: (state,action)=>{
            let {userInfo} = state;
              if(userInfo.loading === "pending"){
                  userInfo.loading = "idle"
                  userInfo.currentRequestID = undefined;
                  userInfo.error= null;
                  state.userInfo.info= action.payload
              }
              },
          [getUserInfo.rejected]: (state,action)=>{
              let {userInfo} = state;
              if(userInfo.loading === "pending"){
                  userInfo.loading="idle"// seteo el loading como terminado
                  userInfo.currentRequestID = undefined;
                  userInfo.error = action.payload; //envio el error
              }
          },
          
        [getUserAccountInfo.pending]: (state,action)=>{
          let {userAccountInfo} = state;
          if(userAccountInfo.loading === "idle"){
              userAccountInfo.loading = "pending"
              userAccountInfo.currentRequestID = action.meta.requestId
          }
          },
          [getUserAccountInfo.fulfilled]: (state,action)=>{
            let {userAccountInfo} = state;
              if(userAccountInfo.loading === "pending"){
                  userAccountInfo.loading = "idle"
                  userAccountInfo.currentRequestID = undefined;
                  userAccountInfo.error= null;
                  state.userAccountInfo.info= action.payload
              }
              },
          [getUserAccountInfo.rejected]: (state,action)=>{
              let {userAccountInfo} = state;
              if(userAccountInfo.loading === "pending"){
                  userAccountInfo.loading="idle"// seteo el loading como terminado
                  userAccountInfo.currentRequestID = undefined;
                  userAccountInfo.error = action.payload; //envio el error
              }
          },
          [getBalance.pending]: (state,action)=>{
            let {userBalance} = state;
            if(userBalance.loading === "idle"){
                userBalance.loading = "pending"
                userBalance.currentRequestID = action.meta.requestId
            }
            },
            [getBalance.fulfilled]: (state,action)=>{
              let {userBalance} = state;
                if(userBalance.loading === "pending"){
                    userBalance.loading = "idle"
                    userBalance.currentRequestID = undefined;
                    userBalance.error= null;
                    state.userBalance.info= action.payload
                }
                },
            [getBalance.rejected]: (state,action)=>{
                let {userBalance} = state;
                if(userBalance.loading === "pending"){
                    userBalance.loading="idle"// seteo el loading como terminado
                    userBalance.currentRequestID = undefined;
                    userBalance.error = action.payload; //envio el error
                }
            }
  }
})

export const {logoutUser, resetSigninState} = userSlice.actions;
export default  userSlice.reducer;

/* const {dni, username, password} = req.body */