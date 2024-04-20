import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, ProductData, PromoData, ReviewData, ReviewPostData, State } from '../types/data-types';
import { APIRoutes } from '../consts/api-routes';
import { showRejectedMessage } from '../utils/get-error-messages';
import { StatusMessages } from '../consts/enums';
import { BasketData, CouponData } from '../types/state-types';

type ThunkConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export const getProductsList = createAsyncThunk<ProductData[], undefined, ThunkConfig>(
  'GET_PRODUCTS_LIST',
  async (_arg, {extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.get<ProductData[]>(APIRoutes.GetProductsList());
      return data;
    } catch (err) {
      showRejectedMessage(StatusMessages.productsListRejected);
      return rejectWithValue(err);
    }
  }
);

export const getSimilarList = createAsyncThunk<ProductData[], {id: number}, ThunkConfig>(
  'GET_SIMILAR_LIST',
  async ({id}, {extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.get<ProductData[]>(APIRoutes.GetSimilarList(id));
      return data;
    } catch (err) {
      showRejectedMessage(StatusMessages.similarListRejected);
      return rejectWithValue(err);
    }
  }
);

export const getProduct = createAsyncThunk<ProductData, {id: number}, ThunkConfig>(
  'GET_PRODUCT',
  async ({id}, {extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.get<ProductData>(APIRoutes.GetProduct(id));
      return data;
    } catch (err) {
      showRejectedMessage(StatusMessages.productRejected);
      return rejectWithValue(err);
    }
  }
);

export const getPromoList = createAsyncThunk<PromoData[], undefined, ThunkConfig>(
  'GET_PROMO_LIST',
  async (_arg, {extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.get<PromoData[]>(APIRoutes.GetPromoList());
      return data;
    } catch (err) {
      showRejectedMessage(StatusMessages.promoListRejected);
      return rejectWithValue(err);
    }
  }
);

export const getReviewsList = createAsyncThunk<ReviewData[], {id: number}, ThunkConfig>(
  'GET_REVIEWS_LIST',
  async ({id}, {extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.get<ReviewData[]>(APIRoutes.GetReviewsList(id));
      return data;
    } catch (err) {
      showRejectedMessage(StatusMessages.reviewsListRejected);
      return rejectWithValue(err);
    }
  }
);

export const postReview = createAsyncThunk<ReviewData, {reviewPostData: ReviewPostData}, ThunkConfig>(
  'POST_REVIEW',
  async ({reviewPostData}, {extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.post<ReviewData>(APIRoutes.PostReview(), reviewPostData);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const checkCoupons = createAsyncThunk<number, {couponData: CouponData}, ThunkConfig>(
  'CHECK_COUPONS',
  async ({couponData}, {extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.post<number>(APIRoutes.CheckCoupons(), couponData);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const postOrder = createAsyncThunk<void, {basketData: BasketData}, ThunkConfig>(
  'POST_ORDER',
  async ({basketData}, {extra: api, rejectWithValue}) => {
    try {
      await api.post(APIRoutes.PostOrder(), basketData);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
