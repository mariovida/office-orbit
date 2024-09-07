import { configureStore } from "@reduxjs/toolkit";
import type { Action, ThunkAction } from "@reduxjs/toolkit";

import { userReducer } from "./slices/usersSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    // patients: patientReducer,
    // doctors: doctorReducer,
    // invoices: invoiceReducer,
    // appointments: appointmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
