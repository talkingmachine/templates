import { ProductCategory } from '../consts/enums';
import { ProductData, ReviewData } from '../types/data-types';

export const formatPrice = (price: number) => price.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');

const getMonthNameInGenitiveCase = (date: Date) =>
  ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
  ][date.getMonth()];

export const formatProductData = (productData: ProductData) => ({
  ...productData,
  price: formatPrice(productData.price),
});

export const formatReviewData = (reviewData: ReviewData) => {
  const date = new Date(reviewData.createAt);
  return ({
    ...reviewData,
    createAt: {
      formatted: `${date.getDate().toString().padStart(2,'0')} ${getMonthNameInGenitiveCase(date)}`,
      dateTime: reviewData.createAt
    }
  });
};

export const productsDataToCatalogList = (productsData: ProductData[], currentPage: number, maxPage: number) =>
  productsData
    .slice(
      maxPage * (currentPage - 1),
      maxPage * currentPage
    )
    .map(formatProductData);


export const reviewsDataToReviewsList = (reviewsData: ReviewData[], currentPage: number, reviewsPerPage: number) =>
  reviewsData
    .map(formatReviewData)
    .sort((review1, review2) =>
      new Date(review2.createAt.dateTime).getTime() - new Date(review1.createAt.dateTime).getTime())
    .slice(0, reviewsPerPage * currentPage);


export const formatTypeAndCategory = (type:string, category:ProductCategory) => {
  const mode2Categories = [ProductCategory.Видеокамера];

  return `${mode2Categories.includes(category) ?
    type : `${type.slice(0, type.length - 2)}ый`} ${category.toLocaleLowerCase()}`;
};

