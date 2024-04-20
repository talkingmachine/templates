import { createSlice } from '@reduxjs/toolkit';
import { ReducerNameSpaces, Status } from '../../consts/enums';
import { removeModal, resetPostOrderStatus, setFilterPriceLimiters, setNarrow, showModal } from '../actions';
import { statesInitialState } from '../../consts/global';
import { checkCoupons, postOrder } from '../api-actions';
import { Basket } from '../local-storage';


export const statesSlice = createSlice({
  name: ReducerNameSpaces.states,
  initialState: statesInitialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(showModal, (state, action) => {
        state.popupInfo.popup = action.payload;
      })
      .addCase(removeModal, (state) => {
        state.popupInfo.popup = false;
        state.popupInfo.isNarrow = false;
      })
      .addCase(setNarrow, (state) => {
        state.popupInfo.isNarrow = true;
      })
      .addCase(setFilterPriceLimiters, (state, action) => {
        state.filterPriceLimiters = action.payload;
      })
      .addCase(checkCoupons.fulfilled, (state, action) => { // checkCoupons
        Basket.setPromoDiscount(action.payload);
        state.couponCheckStatus = Status.downloaded;
      })
      .addCase(checkCoupons.rejected, (state) => {
        Basket.removePromoDiscount();
        Basket.removePromo();
        state.couponCheckStatus = Status.rejected;
      })
      .addCase(postOrder.fulfilled, (state) => { // postOrder
        state.postOrderStatus = Status.downloaded;
        state.couponCheckStatus = Status.default;
      })
      .addCase(postOrder.rejected, (state) => {
        state.postOrderStatus = Status.rejected;
      })
      .addCase(resetPostOrderStatus, (state) => {
        state.postOrderStatus = Status.default;
      });
  },
});
