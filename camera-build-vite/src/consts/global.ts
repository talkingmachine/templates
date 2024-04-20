import { Basket } from '../store/local-storage';
import { ProductData, PromoData, ReviewData } from '../types/data-types';
import { BreadcrumbData } from '../types/state-types';
import { ProductCategory, ProductLevel, ProductType, Status } from './enums';
import { RouterPaths } from './router-paths';

export const PRODUCTS_PER_PAGE = 9;
export const PAGES_PER_ROW = 3;
export const STARS_NUMBER = 5;
export const SIMILAR_PRODUCTS_PER_PAGE = 3;
export const REVIEWS_PER_PAGE = 3;
export const REVIEW_SYMBOLS = {min: 2, max: 160};
export const APP_NAME = 'Фотошоп';
export const PROMOS = ['camera-333', 'camera-444', 'camera-555'];


export const getRatingNumbersArray = Array.from({length: STARS_NUMBER}, (_, index) => index + 1);

export const messages = {
  productNameNotFound: 'Название продукта не найдено'
};

export const ImagesParams = {
  catalogPage: {
    banner: {
      width: 1280,
      height: 280,
      alt: 'баннер'
    },
    productsList: {
      width: 280,
      height: 240,
      alt: ''
    }
  },
  productPage: {
    productContainer: {
      width: 560,
      height: 480,
      alt: ''
    },
    similarProducts: {
      width: 280,
      height: 240,
      alt: ''
    }
  },
  popups: {
    addItem: {
      width: 140,
      height: 120,
      alt: ''
    }
  }
};

export const defaultBreadcrumbData: BreadcrumbData = {
  name: 'Главная',
  path: RouterPaths.catalog(),
  isLast: true,
};

type DataInitialStateType = {
  productsList: {
    data: ProductData[];
    status: Status;
  };
  similarList: {
    data: ProductData[];
    status: Status;
  };
  promoList: {
    data: PromoData[];
    status: Status;
  };
  product: {
    data: ProductData;
    status: Status;
  };
  reviewsList: {
    data: ReviewData[];
    status: Status;
  };
}
type StatesInitialStateType = {
  popupInfo: {
    popup: JSX.Element | false;
    isNarrow: boolean;
  };
  filterPriceLimiters: {
    min: number;
    max: number;
  };
  couponCheckStatus: Status;
  postOrderStatus: Status;
}

export const statesInitialState: StatesInitialStateType = {
  popupInfo: {
    popup: false,
    isNarrow: false,
  },
  filterPriceLimiters: {
    min: 0,
    max: 0
  },
  couponCheckStatus: Basket.getPromoDiscount() ? Status.downloaded : Status.default,
  postOrderStatus: Status.default
};
export const dataInitialState: DataInitialStateType = {
  productsList: {
    data: [
      {
        'id': 1,
        'name': 'Ретрокамера Dus Auge lV',
        'vendorCode': 'DA4IU67AD5',
        'type': ProductType['Коллекционная'],
        'category': ProductCategory['Видеокамера'],
        'description': 'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди коллекционеров и яростных почитателей старинной техники.',
        'level': ProductLevel['Нулевой'],
        'price': 65000,
        'rating': 5,
        'reviewCount': 16,
        'previewImg': 'img/content/das-auge.jpg',
        'previewImg2x': 'img/content/das-auge@2x.jpg',
        'previewImgWebp': 'img/content/das-auge.webp',
        'previewImgWebp2x': 'img/content/das-auge@2x.webp'
      }
    ],
    status: Status.default
  },
  similarList: {
    data: [
      {
        'id': 1,
        'name': 'Ретрокамера Dus Auge lV',
        'vendorCode': 'DA4IU67AD5',
        'type': ProductType['Коллекционная'],
        'category': ProductCategory['Видеокамера'],
        'description': 'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди коллекционеров и яростных почитателей старинной техники.',
        'level': ProductLevel['Нулевой'],
        'price': 65000,
        'rating': 5,
        'reviewCount': 16,
        'previewImg': 'img/content/das-auge.jpg',
        'previewImg2x': 'img/content/das-auge@2x.jpg',
        'previewImgWebp': 'img/content/das-auge.webp',
        'previewImgWebp2x': 'img/content/das-auge@2x.webp'
      }
    ],
    status: Status.default
  },
  promoList: {
    data: [
      {
        id: 1,
        name: 'Ретрокамера Dus Auge lV',
        previewImg: 'img/content/promo.jpg',
        previewImgWebp2x: 'img/content/promo@2x.webp',
        previewImg2x: 'img/content/promo@2x.jpg',
        previewImgWebp: 'img/content/promo.webp',
      }
    ],
    status: Status.default
  },
  product: {
    data: {
      'id': -1,
      'name': 'Ретрокамера Dus Auge lV',
      'vendorCode': 'DA4IU67AD5',
      'type': ProductType['Коллекционная'],
      'category': ProductCategory['Видеокамера'],
      'description': 'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди коллекционеров и яростных почитателей старинной техники.',
      'level': ProductLevel['Нулевой'],
      'price': 65000,
      'rating': 5,
      'reviewCount': 16,
      'previewImg': 'img/content/das-auge.jpg',
      'previewImg2x': 'img/content/das-auge@2x.jpg',
      'previewImgWebp': 'img/content/das-auge.webp',
      'previewImgWebp2x': 'img/content/das-auge@2x.webp'
    },
    status: Status.default
  },
  reviewsList: {
    data: [
      {
        'id': 'f1d10ddd-2a21-4f71-9e1e-5f511703fbdd',
        'createAt': '2022-07-09T13:24:57.980Z',
        'cameraId': 1,
        'userName': 'Кирилл',
        'advantage': 'Легкая в плане веса, удобная в интерфейсе',
        'disadvantage': 'Быстро садиться зарядка',
        'review': 'Это моя первая камера. Я в восторге, нареканий нет',
        'rating': 5
      }
    ],
    status: Status.default
  }
};
