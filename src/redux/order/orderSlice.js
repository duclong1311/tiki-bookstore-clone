import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

/**
 *  orders = [
    { quantity: 1, _id: 'abc',  detail: { _id: 'abc', name: 'def'}},
    { quantity: 1, _id: '123',  detail: { _id: '123', name: '456'}},
  ]
 * 
 */

const initialState = {
    carts: [],
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        doAddBookAction: (state, action) => {
            let orders = [...state.carts];
            const item = action.payload;
            const isExistIndex = orders.findIndex(c => c._id === item._id);

            if (isExistIndex > -1) {
                orders[isExistIndex].quantity += item.quantity;
                if (orders[isExistIndex].quantity > orders[isExistIndex].detail.quantity) {
                    orders[isExistIndex].quantity = orders[isExistIndex].detail.quantity
                }
            } else {
                orders.push(action.payload);
            }

            state.carts = orders;

            console.log('check orders', state.carts);
            message.success("Sản phẩm đã được thêm vào Giỏ hàng");
        },
    },
});

export const { doAddBookAction } = orderSlice.actions;

export default orderSlice.reducer;
