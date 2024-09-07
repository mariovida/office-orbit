import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { api } from "@src/services/user_api";
import { User, UserCredentials } from "@src/types/users";

type UserState = {
  items: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  userId: string | null;
};

const initialState: UserState = {
  items: [],
  status: "idle",
  error: null,
  userId: null,
};

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData: UserCredentials) => {
    return await api.register(userData);
  },
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (userData: UserCredentials, { rejectWithValue }) => {
    try {
      return await api.loginUser(userData);
    } catch (error: any) {
      //console.error('Login error:', error);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  },
);

export const setupPassword = createAsyncThunk(
  "users/setupPassword",
  async (userData: UserCredentials) => {
    return await api.setupPassword(userData);
  },
);

export const changePassword = createAsyncThunk(
  "users/changePassword",
  async (userData: UserCredentials) => {
    return await api.changePassword(userData);
  },
);

export const forgotPassword = createAsyncThunk(
  "users/forgotPassword",
  async (userData: UserCredentials, { rejectWithValue }) => {
    try {
      const response = await api.forgotPassword(userData);
      if (response.status === 404) {
        return rejectWithValue({
          message: "User with this email was not found.",
        });
      }
    } catch (error: any) {
      return rejectWithValue({
        message: error.message || "Something went wrong",
      });
    }
  },
);

export const userDetails = createAsyncThunk("users/userDetails", async (userId: any) => {
  return await api.getUserDetails(userId);
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setupPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        const { accessToken, refreshToken } = action.payload;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userSecret", action.payload.userSecret);
        state.items = action.payload.userInfo;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        if (action.payload && action.payload.accessToken) {
          //localStorage.setItem('token', action.payload.accessToken);
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred";
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = "succeeded";
        } else {
          state.status = "failed";
        }
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const userReducer = usersSlice.reducer;
