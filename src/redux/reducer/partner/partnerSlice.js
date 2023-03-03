import { createSlice } from "@reduxjs/toolkit";

const partnerSlice = createSlice({
  name: "partner",
  initialState: {
    name: "",
    lastName:"",
    documentType:"",
    partnerId:null,
    phone:"",
    address:"",
    email:"",
    type:"",
  },  
  reducers: {
    setPartner: (state, action) => {
      state.name = action.payload.name;
      state.lastName = action.payload.lastName;
      state.documentType = action.payload.documentType;
      state.partnerId = action.payload.partnerId;
      state.phone = action.payload.phone;
      state.address = action.payload.address;
      state.email = action.payload.email;
      state.type = action.payload.type;
     
    },
     unSetPartner:(state)=>{
      state.name = "";
      state.lastName = "";
      state.documentType = "";
      state.partnerId = null;
      state.phone = "";
      state.address = "";
      state.email = "";
      state.type = "";
     }
  },
});

export const { setPartner,unSetPartner } = partnerSlice.actions;

export default partnerSlice.reducer;

