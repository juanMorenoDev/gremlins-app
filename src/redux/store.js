import { configureStore } from '@reduxjs/toolkit'
// reducers
import userReducer from './reducer/user/userSlice'
import orderReducer from './reducer/order/orderSlice'
import partnerReducer from './reducer/partner/partnerSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer,
    partner: partnerReducer
  }
})
