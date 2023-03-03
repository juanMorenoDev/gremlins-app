import { createSlice } from "@reduxjs/toolkit";

const partnerSlice = createSlice({
  name: "partner",
  initialState: {
    name: "",
    lastName: "",
    documentType: "",
    partnerId: "",
    phone: "",
    address: "",
  },  
  reducers: {
    setPartner: (state, action) => {
      state.name = action.payload.name;
      state.lastName = action.payload.lastName;
      state.documentType = action.payload.documentType;
      state.partnerId = action.payload.partnerId;
      state.phone = action.payload.phone;
      state.address = action.payload.address;
    },
     unSetPartner:(state, action)=>{
      state.name = "";
      state.lastName = "";
      state.documentType = "";
      state.partnerId = "";
      state.phone = "";
      state.address = "";
     }
  },
});

export const { setPartner,unSetPartner } = partnerSlice.actions;

export default partnerSlice.reducer;

