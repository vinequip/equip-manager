import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  userEmail: string | null;
  uid: string | null;
  firstName?: string | null;
  lastName?: string | null;
  role: string | null;
}

type PayloadProp = {
  userEmail: string | null;
  firstName: string | null;
  lastName: string | null;
  uid: string | null;
  role: string | null;
};

const initialState: AuthState = {
  userEmail: "",
  uid: "",
  lastName: "",
  firstName: "",
  role: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<PayloadProp>) => {
      state.userEmail = action.payload.userEmail;
      state.uid = action.payload.uid;
      state.lastName = action.payload.lastName;
      state.firstName = action.payload.firstName;
      state.role = action.payload.role;
    },
    logOutUser: (state) => {
      state.userEmail = "";
      state.uid = "";
      state.lastName = "";
      state.firstName = "";
      state.role = "";
    },
  },
});

export const { addUser, logOutUser } = authSlice.actions;

export default authSlice.reducer;
