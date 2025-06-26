import {
  AuthLogin,
  ChangePassword,
  Signup,
  GetUserInformation,
  ResetPassword
} from "../../Service/AuthService";
import * as actions from "../actions/index"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const LoginHandler = createAsyncThunk(
  actions.LOGIN,
   async (data,{rejectWithValue}) => {
    try{
      const response = await AuthLogin(data);
      return response.data;
    }
    catch(error){
      return rejectWithValue(error)
    }
  });

export const ForgetPasswordHandler = createAsyncThunk(
  actions.FORGETPASSWORD,
  async (data) => {
    try {
      const response = await ChangePassword(data);
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
    
  }
);
export const ResetPasswordHandler = createAsyncThunk(actions.RESTPASSWORD, async (data) => {
  console.log(data, "reset password");
  const response = await ResetPassword (data);
  console.log(response.data, "reset password");
});
export const UserSignupHandler = createAsyncThunk(
  actions.SIGNUP,
  async (data) => {
    const response = await Signup(data);
    return response.data;
  }
);

export const GetUserInformationHandler = createAsyncThunk(
  actions.GETUSERINFO,
  async () => {
    const response = await GetUserInformation();
    console.log(response.data,"user information using token");
    return response.data;
  }
);
const initialState = {
  isUser: false,
  userData: {},
  message: "",
};
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logouthandler: (state, action) => {
      state.isUser = false,
      state.message = "";
      state.userData = {};
      localStorage.clear();
    },
    setMessageEmpty: (state, action) => {
      state.message = "";
    }
  },
  extraReducers: (builder) => {
    builder.addCase(LoginHandler.fulfilled, (state, action) => {
        state.userData = action?.payload;
        state.isUser = true, 
        localStorage.setItem("token",JSON.stringify(action?.payload?.accessToken))
        state.message = action?.payload?.message;
    });
    builder.addCase(LoginHandler.rejected, (state, action) => {
      console.log(action?.payload?.response?.data?.message, "inside rejected");
    });
    builder.addCase(ForgetPasswordHandler.fulfilled, (state, action) => {
        console.log(action.payload.message,"maile send")
    });
    builder.addCase(ForgetPasswordHandler.rejected, (state, action) => {
      
    });
    builder.addCase(UserSignupHandler.fulfilled, (state, action) => {
      if ((action.payload.code === 200)) {
        state.isUser = true;
        state.userData = action.payload;
        state.message = action.payload.message;
      }
    });
    builder.addCase(GetUserInformationHandler.fulfilled, (state, action) => {
      console.log(action.payload, "inside rejected");
    });
  },
});
export const { logouthandler, setMessageEmpty } = authSlice.actions;
export default authSlice.reducer;
