import createAPI from '../services/api-axios';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { APIRoutes } from '../consts/api-routes';
import { getProduct, getProductsList, getPromoList, getReviewsList, getSimilarList, postReview } from './api-actions';
import { ReviewPostData, State } from '../types/data-types';
import { AppThunkDispatch, extractActionsTypes } from '../utils/mocks';


describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      DATA: {},
      STATES: {}
    });
  });

  describe('getProductsList', () => {
    it('should dispatch getProductsList.pending and getProductsList.fulfilled when server response 200', async () => {
      mockAxiosAdapter
        .onGet(APIRoutes.GetProductsList())
        .reply(200);

      await store.dispatch(getProductsList());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getProductsList.pending.type,
        getProductsList.fulfilled.type,
      ]);
    });

    it('should dispatch getProductsList.pending and getProductsList.rejected when server response 400', async() => {
      mockAxiosAdapter
        .onGet(APIRoutes.GetProductsList())
        .reply(400);

      await store.dispatch(getProductsList());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getProductsList.pending.type,
        getProductsList.rejected.type,
      ]);
    });
  });

  describe('getSimilarList', () => {
    it('should dispatch getSimilarList.pending and getSimilarList.fulfilled when server response 200', async () => {
      mockAxiosAdapter
        .onGet(APIRoutes.GetSimilarList(1))
        .reply(200);

      await store.dispatch(getSimilarList({id: 1}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getSimilarList.pending.type,
        getSimilarList.fulfilled.type,
      ]);
    });

    it('should dispatch getSimilarList.pending and getSimilarList.rejected when server response 400', async() => {
      mockAxiosAdapter
        .onGet(APIRoutes.GetSimilarList(1))
        .reply(400);

      await store.dispatch(getSimilarList({id: 1}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getSimilarList.pending.type,
        getSimilarList.rejected.type,
      ]);
    });
  });

  describe('getProduct', () => {
    it('should dispatch getProduct.pending and getProduct.fulfilled when server response 200', async () => {
      mockAxiosAdapter
        .onGet(APIRoutes.GetProduct(1))
        .reply(200);

      await store.dispatch(getProduct({id: 1}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getProduct.pending.type,
        getProduct.fulfilled.type,
      ]);
    });

    it('should dispatch getProduct.pending and getProduct.rejected when server response 400', async() => {
      mockAxiosAdapter
        .onGet(APIRoutes.GetProduct(1))
        .reply(400);

      await store.dispatch(getProduct({id: 1}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getProduct.pending.type,
        getProduct.rejected.type,
      ]);
    });
  });

  describe('getPromoList', () => {
    it('should dispatch getPromoList.pending and getPromoList.fulfilled when server response 200', async () => {
      mockAxiosAdapter
        .onGet(APIRoutes.GetPromoList())
        .reply(200);

      await store.dispatch(getPromoList());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getPromoList.pending.type,
        getPromoList.fulfilled.type,
      ]);
    });

    it('should dispatch getPromoList.pending and getPromoList.rejected when server response 400', async() => {
      mockAxiosAdapter
        .onGet(APIRoutes.GetPromoList())
        .reply(400);

      await store.dispatch(getPromoList());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getPromoList.pending.type,
        getPromoList.rejected.type,
      ]);
    });
  });

  describe('getReviewsList', () => {
    it('should dispatch getReviewsList.pending and getReviewsList.fulfilled when server response 200', async () => {
      mockAxiosAdapter
        .onGet(APIRoutes.GetReviewsList(1))
        .reply(200);

      await store.dispatch(getReviewsList({id: 1}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getReviewsList.pending.type,
        getReviewsList.fulfilled.type,
      ]);
    });

    it('should dispatch getReviewsList.pending and getReviewsList.rejected when server response 400', async() => {
      mockAxiosAdapter
        .onGet(APIRoutes.GetReviewsList(1))
        .reply(400);

      await store.dispatch(getReviewsList({id: 1}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getReviewsList.pending.type,
        getReviewsList.rejected.type,
      ]);
    });
  });

  describe('postReview', () => {
    it('should dispatch postReview.pending and postReview.fulfilled when server response 200', async () => {
      mockAxiosAdapter
        .onPost(APIRoutes.PostReview())
        .reply(201);

      await store.dispatch(postReview({reviewPostData: {} as ReviewPostData}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postReview.pending.type,
        postReview.fulfilled.type,
      ]);
    });
  });
});

