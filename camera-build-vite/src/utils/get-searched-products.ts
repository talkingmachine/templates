import { ProductData } from '../types/data-types';

export const getSearchedProducts = (array: ProductData[], searchText: string) => {
  const searchKeywords = searchText.split(' ').filter((keyword) => keyword);
  return (
    array.filter((product) => {
      for (const keyword of searchKeywords) {
        if (product.name.toLowerCase().includes(keyword.toLowerCase())) {
          return true;
        }
      }
      return false;
    })
  );
};

