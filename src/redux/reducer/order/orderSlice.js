import { createSlice } from '@reduxjs/toolkit'

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    clientId: '',
    products: [
      {
        product: {},
        quantity: 0
      }
    ]
  },
  reducers: {
    addProductToOrder: (state, action) => {
      state.products = [...state.products, action.payload]
    }
  }
})

export const { addProductToOrder } = orderSlice.actions

export default orderSlice.reducer
