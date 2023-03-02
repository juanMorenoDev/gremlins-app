import { configureStore } from "@reduxjs/toolkit";
//reducers
import userReducer from "./reducer/user/userSlice";
import orderReducer from "./reducer/order/orderSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer,
  },
})
