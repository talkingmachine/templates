export const APIRoutes = {
  GetProductsList: ():string => '/cameras',
  PostReview: () => '/reviews',
  GetSimilarList: (id: number):string => `/cameras/${id}/similar`,
  GetPromoList: ():string => '/promo',
  GetProduct: (id: number):string => `/cameras/${id}`,
  GetReviewsList: (id: number):string => `/cameras/${id}/reviews`,
  CheckCoupons: ():string => '/coupons',
  PostOrder: ():string => '/orders'
};
