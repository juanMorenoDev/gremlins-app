import { createSlice } from "@reduxjs/toolkit";
//create userSlice
const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    password: "",
    token: "",
  },
  reducers: {
    setUser: (state, action) => { 
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.token = action.payload.token;
    },  
    unsetUser:(state)=>{ 
      state.email ="";
      state.password ="";
      state.token = "";
    }
  },
});

//export userSlice
export const { setUser, unsetUser } = userSlice.actions;

//export userSlice reducer
export default userSlice.reducer;
