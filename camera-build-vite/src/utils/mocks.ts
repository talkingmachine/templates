import { ThunkDispatch } from '@reduxjs/toolkit';
import createAPI from '../services/api-axios';
import { Action } from 'redux';
import { ProductData, ReviewPostData, State } from '../types/data-types';
import { ProductCategory, ProductLevel, ProductType } from '../consts/enums';
import faker from 'faker';


export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
export const getMockReviewData = (): ReviewPostData => ({
  cameraId: 1,
  userName: 'Test User',
  advantage: 'Test advantage',
  disadvantage: 'Test disadvantage',
  review: 'Test review',
  rating: 5,
});
export const getMockProductList = (k: number): ProductData[] => {
  const result: ProductData[] = [];
  for (let i = 0; i < k; i++) {
    result.push({
      id: Math.floor(Math.random() * 98) + 2,
      name: faker.name.findName(),
      vendorCode: (Math.floor(Math.random() * 98) + 2).toString(),
      type: ProductType.Коллекционная,
      category: ProductCategory.Видеокамера,
      description: 'test description',
      level: ProductLevel.Любительский,
      price: Math.floor(Math.random() * 98) + 2,
      rating: Math.floor(Math.random() * 5),
      reviewCount: Math.floor(Math.random() * 98) + 2,
      previewImg:  'test previewImg',
      previewImg2x: ' test previewImg2x',
      previewImgWebp: ' test previewImgWebp',
      previewImgWebp2x: ' test previewImgWebp2x',
    });
  }

  return result;
};
