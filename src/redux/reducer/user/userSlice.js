import { createSlice } from "@reduxjs/toolkit";
//create userSlice
const userSlice = createSlice({
  name: "user",
  initialState: {
    userId:null,
    name:"",
    email: "",
    role:"",
    token: "",
  },
  reducers: {
    setUser: (state, { payload }) => { 
      state.userId = payload.userId;
      state.name = payload.name;
      state.role = payload.role;
      state.email = payload.email;
      state.token = payload.token;
    },  
    unsetUser:(state)=>{ 
      state.userId = null;
      state.name = "";
      state.role = "";
      state.email ="";
      state.token = "";
    }
  },
});

//export userSlice
export const { setUser, unsetUser } = userSlice.actions;

//export userSlice reducer
export default userSlice.reducer;
