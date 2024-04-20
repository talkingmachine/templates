import { FormFilter } from '../consts/enums';

export type BreadcrumbData = {
  name: string;
  path: string;
  isLast: boolean;
}

export type ImageParams = {
  width: number;
  height: number;
  alt: string;
}

export type CouponData = {
  coupon: string;
}

export type BasketData = {
  camerasIds: number[];
  coupon?: string | null;
}

export type FiltersFormInputs = {
  [key in keyof typeof FormFilter]: string[];
}
