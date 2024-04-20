import { ProductCategory, ProductLevel, ProductType } from '../consts/enums';
import { RouterPaths } from '../consts/router-paths';
import { getBreadcrumbsData, getDiscount, getPriceWithDiscount } from './utils';


describe('Utils', () => {
  describe('getBreadcrumbsData', () => {
    it('should return breadcrumbs data for catalog page', () => {
      const expectedBreadcrumbsData = [
        { name: 'Главная', path: '/', isLast: false },
        { name: 'Каталог', path: '/', isLast: true }
      ];

      expect(getBreadcrumbsData(RouterPaths.catalog(), undefined)).toEqual(expectedBreadcrumbsData);
    });

    it('should return breadcrumbs data for product page', () => {
      const expectedBreadcrumbsData = [
        { name: 'Главная', path: '/', isLast: false },
        { name: 'Каталог', path: '/', isLast: false },
        { name: 'FastShot MR-5', path: '/product/2', isLast: true }
      ];
      const fakeProductData = {
        id: 2,
        name: 'FastShot MR-5',
        vendorCode: '',
        type: ProductType['Коллекционная'],
        category: ProductCategory['Видеокамера'],
        description: '',
        level: ProductLevel['Любительский'],
        price: '0',
        rating: 0,
        reviewCount: 0,
        previewImg: '',
        previewImg2x: '',
        previewImgWebp: '',
        previewImgWebp2x: '',
      };

      expect(getBreadcrumbsData(RouterPaths.product(2), fakeProductData)).toEqual(expectedBreadcrumbsData);
    });

    it('should return discount', () => {
      const expectedValues = [
        {in: [10008, 10], exp: '1 001'},
        {in: [9234813, 33], exp: '3 047 488'},
        {in: [0, 0], exp: '0'},
        {in: [0, 25], exp: '0'}
      ];

      for (let i = 0; i < expectedValues.length; i++) {
        expect(getDiscount(expectedValues[i].in[0], expectedValues[i].in[1])).toEqual(expectedValues[i].exp);
      }
    });

    it('should return price with discount', () => {
      const expectedValues = [
        {in: [10008, 10], exp: '9 007'},
        {in: [9234813, 33], exp: '6 187 325'},
        {in: [0, 0], exp: '0'},
        {in: [0, 25], exp: '0'}
      ];

      for (let i = 0; i < expectedValues.length; i++) {
        expect(getPriceWithDiscount(expectedValues[i].in[0], expectedValues[i].in[1])).toEqual(expectedValues[i].exp);
      }
    });
  });
});

