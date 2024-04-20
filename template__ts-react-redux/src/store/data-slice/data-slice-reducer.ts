import { createSlice } from '@reduxjs/toolkit';
import { ReducerNameSpaces, Status } from '../../consts/enums';
import { getProduct, getProductsList, getPromoList, getReviewsList, getSimilarList, postReview } from '../api-actions';
import { dataInitialState } from '../../consts/global';
import { sortProductsList } from '../actions';
import { getSortedProductsList } from '../../utils/utils';


export const dataSlice = createSlice({
  name: ReducerNameSpaces.data,
  initialState: dataInitialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(getProductsList.fulfilled, (state, action) => { // getProductsList
        state.productsList.data = action.payload;
        state.productsList.status = Status.downloaded;
      })
      .addCase(getProductsList.rejected, (state) => {
        state.productsList.status = Status.rejected;
      })
      .addCase(getProductsList.pending, (state) => {
        state.productsList.status = Status.pending;
      })
      .addCase(getSimilarList.fulfilled, (state, action) => { // getSimilarList
        state.similarList.data = action.payload;
        state.similarList.status = Status.downloaded;
      })
      .addCase(getSimilarList.rejected, (state) => {
        state.similarList.status = Status.rejected;
      })
      .addCase(getSimilarList.pending, (state) => {
        state.similarList.status = Status.pending;
      })
      .addCase(getProduct.fulfilled, (state, action) => { // getProduct
        state.product.data = action.payload;
        state.product.status = Status.downloaded;
      })
      .addCase(getProduct.rejected, (state) => {
        state.product.status = Status.rejected;
      })
      .addCase(getProduct.pending, (state) => {
        state.product.status = Status.pending;
      })
      .addCase(getPromoList.fulfilled, (state, action) => { // getPromoList
        state.promoList.data = action.payload;
        state.promoList.status = Status.downloaded;
      })
      .addCase(getPromoList.rejected, (state) => {
        state.promoList.status = Status.rejected;
      })
      .addCase(getPromoList.pending, (state) => {
        state.promoList.status = Status.pending;
      })
      .addCase(getReviewsList.fulfilled, (state, action) => { // getReviewsList
        state.reviewsList.data = action.payload;
        state.reviewsList.status = Status.downloaded;
      })
      .addCase(getReviewsList.rejected, (state) => {
        state.reviewsList.status = Status.rejected;
      })
      .addCase(getReviewsList.pending, (state) => {
        state.reviewsList.status = Status.pending;
      })
      .addCase(postReview.fulfilled, (state, action) => { // postReview
        state.reviewsList.data.push(action.payload);
      })
      .addCase(sortProductsList, (state, action) => { // sortProductsList
        const {sortType, sortDirection} = action.payload;
        state.productsList.data = getSortedProductsList(state.productsList.data, sortType, sortDirection);
      });
  },
});

