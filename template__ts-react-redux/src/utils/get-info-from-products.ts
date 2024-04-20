import { ProductData } from '../types/data-types';

export const getPriceLimiters = (productsList: ProductData[]) => {

  if (!productsList.length) {
    return {
      min: 0,
      max: 0
    };
  }

  const priceMin = (arr: ProductData[]) =>
    arr.reduce((acc, product) => (acc < product.price ? acc : product.price), Number.POSITIVE_INFINITY);
  const priceMax = (arr: ProductData[]) =>
    arr.reduce((acc, product) => (acc > product.price ? acc : product.price), 0);

  return {
    min: priceMin(productsList),
    max: priceMax(productsList)
  };
};
