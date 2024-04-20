import { SortDirection, SortType } from '../consts/enums';
import { defaultBreadcrumbData, messages } from '../consts/global';
import { RouterPaths, RouterPathsNames } from '../consts/router-paths';
import { CatalogCardData, ProductData } from '../types/data-types';
import { BreadcrumbData } from '../types/state-types';
import { formatPrice } from './data-formatting';


export const getBreadcrumbsData = (pathname: string, productPageInfo: CatalogCardData | undefined) => {

  const breadcrumbsListData: BreadcrumbData[] = [defaultBreadcrumbData];
  const setBreadcrumbNotLast = () => {
    breadcrumbsListData[breadcrumbsListData.length - 1].isLast = false;
  };

  if (pathname.includes(RouterPaths.catalog())) {
    setBreadcrumbNotLast();
    breadcrumbsListData.push({
      name: RouterPathsNames[RouterPaths.catalog()],
      path: RouterPaths.catalog(),
      isLast: true
    });
  }
  if (pathname.includes(RouterPaths.productWithoutId())) {
    setBreadcrumbNotLast();
    breadcrumbsListData.push({
      name: productPageInfo ? productPageInfo.name : messages.productNameNotFound,
      path: productPageInfo ? `${RouterPaths.productWithoutId()}/${productPageInfo.id}` : '#',
      isLast: true
    });
  }

  return breadcrumbsListData;
};

export const getSortedProductsList = (productsList: ProductData[], sortType: SortType, sortDirection: SortDirection) =>
  productsList.sort((productA, productB) => {
    let diff;
    switch (sortType) {
      case SortType.Popular:
        diff = productA.rating - productB.rating;
        break;
      case SortType.Price:
        diff = productA.price - productB.price;
        break;
      default:
        diff = productA.rating - productB.rating;
        break;
    }
    return diff * sortDirection;
  });

export const getScrollbarWidth = () => {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; // forcing scrollbar to appear
  document.body.appendChild(outer);
  // Creating inner element and placing it in the container
  const inner = document.createElement('div');
  outer.appendChild(inner);
  // Calculating difference between container's full width and the child width
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
  // Removing temporary elements from the DOM
  outer.parentNode?.removeChild(outer);
  return scrollbarWidth;
  // https://stackoverflow.com/questions/13382516/getting-scroll-bar-width-using-javascript/13382873#13382873
};

export const getDiscount = (price: number, discount: number) => {
  const res = price * (discount / 100);
  return formatPrice(Math.round(res));
};

export const getPriceWithDiscount = (price: number, discount: number) => {
  const res = price * (discount / 100);
  return formatPrice(price - Math.round(res));
};

