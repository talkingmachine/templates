import { ProductCategory, ProductLevel, ProductType } from '../consts/enums';
import { store } from '../store';
import { formatProductData, formatReviewData } from '../utils/data-formatting';

export type ProductData = {
    id: number;
    name: string;
    vendorCode: string;
    type: ProductType;
    category: ProductCategory;
    description: string;
    level: ProductLevel;
    price: number;
    rating: number;
    reviewCount: number;
    previewImg: string;
    previewImg2x: string;
    previewImgWebp: string;
    previewImgWebp2x: string;
}

export type CatalogCardData = (ReturnType<typeof formatProductData>)
export type ReviewtData = (ReturnType<typeof formatReviewData>)

export type PromoData = {
  id: number;
  name: string;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}

export type ReviewData = {
  id: string;
  createAt: string;
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}
export type ReviewPostData = {
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

