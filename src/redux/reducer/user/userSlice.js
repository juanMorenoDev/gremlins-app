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
    setUser: (state, action) => { 
      
      
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.token = action.payload.token;
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
