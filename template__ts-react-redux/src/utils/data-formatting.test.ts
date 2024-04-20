import { ProductCategory, ProductLevel, ProductType } from '../consts/enums';
import { formatPrice, formatReviewData, productsDataToCatalogList, reviewsDataToReviewsList } from './data-formatting';

describe('Data formatting', () => {
  describe('formatPrice', () => {
    it('should return formatted price', () => {
      const tests = [
        { prop: 12345, expected: '12 345' },
        { prop: 0, expected: '0' },
        { prop: 1000000, expected: '1 000 000' },
      ];
      tests.forEach((test) => {
        expect(formatPrice(test.prop)).toEqual(test.expected);
      });
    });
  });

  describe('formatReviewData', () => {
    it('should format date', () => {
      const tests = [
        {
          prop: {
            id: '1',
            createAt: '2023-09-28T16:24:21.753Z',
            cameraId: 1234,
            userName: 'test userName',
            advantage: 'test advantage',
            disadvantage: 'test disadvantage',
            review: 'test review',
            rating: 5
          },
          expected: {
            id: '1',
            createAt: {
              formatted: '28 сентября',
              dateTime: '2023-09-28T16:24:21.753Z'
            },
            cameraId: 1234,
            userName: 'test userName',
            advantage: 'test advantage',
            disadvantage: 'test disadvantage',
            review: 'test review',
            rating: 5
          }
        },
      ];
      tests.forEach((test) => {
        expect(formatReviewData(test.prop)).toEqual(test.expected);
      });
    });
  });

  describe('productsDataToCatalogList', () => {
    it('should return catalog list', () => {
      const test = [{
        id: 1,
        name: 'test name 1',
        vendorCode: 'test vendor code 1',
        type: ProductType['Коллекционная'],
        category: ProductCategory['Видеокамера'],
        description: 'test description 1',
        level: ProductLevel['Любительский'],
        price: 1111111,
        rating: 1,
        reviewCount: 111,
        previewImg:  'test previewImg 1',
        previewImg2x: ' test previewImg2x 1',
        previewImgWebp: ' test previewImgWebp 1',
        previewImgWebp2x: ' test previewImgWebp2x 1',
      },
      {
        id: 2,
        name: 'test name 2',
        vendorCode: 'test vendor code 2',
        type: ProductType['Моментальная'],
        category: ProductCategory['Фотоаппарат'],
        description: 'test description 2',
        level: ProductLevel['Нулевой'],
        price: 2222222,
        rating: 2,
        reviewCount: 112,
        previewImg:  'test previewImg 2',
        previewImg2x: ' test previewImg2x 2',
        previewImgWebp: ' test previewImgWebp 2',
        previewImgWebp2x: ' test previewImgWebp2x 2',
      },
      {
        id: 3,
        name: 'test name 3',
        vendorCode: 'test vendor code 3',
        type: ProductType['Цифровая'],
        category: ProductCategory['Видеокамера'],
        description: 'test description 3',
        level: ProductLevel['Профессиональный'],
        price: 33333333,
        rating: 3,
        reviewCount: 113,
        previewImg:  'test previewImg 3',
        previewImg2x: ' test previewImg2x 3',
        previewImgWebp: ' test previewImgWebp 3',
        previewImgWebp2x: ' test previewImgWebp2x 3',
      }];
      expect(productsDataToCatalogList(test, 2, 2)).toEqual([{
        id: 3,
        name: 'test name 3',
        vendorCode: 'test vendor code 3',
        type: ProductType['Цифровая'],
        category: ProductCategory['Видеокамера'],
        description: 'test description 3',
        level: ProductLevel['Профессиональный'],
        price: '33 333 333',
        rating: 3,
        reviewCount: 113,
        previewImg:  'test previewImg 3',
        previewImg2x: ' test previewImg2x 3',
        previewImgWebp: ' test previewImgWebp 3',
        previewImgWebp2x: ' test previewImgWebp2x 3',
      }]);
    });
  });

  describe('reviewsDataToReviewsList', () => {
    it('should return reviews list', () => {
      const test = [{
        id:	'fe9e9560-c49e-4b77-8fd5-2ec21a29b838',
        userName:	'Анастасия',
        advantage:	'Нет.',
        disadvantage:	'Пришла поврежденная упаковка. Нет теперь понимая со внутренностями',
        review:	'Не возможно найти дополнительные аккамуляторы. К сожалению, те, что идут в комплекте не держут более 7 часов?',
        rating:	1,
        createAt:	'2023-05-24T12:51:44.772Z',
        cameraId:	2
      },
      {
        id:	'e67a2d73-d339-420a-aa87-9e3a649d8d4d',
        userName:	'asdasdasdasdasdasd',
        advantage:	'asdasdasdasdasdasd',
        disadvantage:	'asdasdasdasdasdasd',
        review:	'asdasdasdasdasdasd',
        rating:	2,
        createAt:	'2023-09-22T14:52:13.980Z',
        cameraId:	2
      },
      {
        id:	'99a0125b-13ae-476e-8f30-d1e74afc108d',
        userName:	'asdaf',
        advantage:	'красивое',
        disadvantage:	'Некрасивое',
        review:	'fd?',
        rating:	4,
        createAt:	'2023-10-17T14:11:17.014Z',
        cameraId:	2
      }];
      const expected = [{
        id:	'99a0125b-13ae-476e-8f30-d1e74afc108d',
        userName:	'asdaf',
        advantage:	'красивое',
        disadvantage:	'Некрасивое',
        review:	'fd?',
        rating:	4,
        createAt:	{
          dateTime: '2023-10-17T14:11:17.014Z',
          formatted: '17 октября'
        },
        cameraId:	2
      },
      {
        id:	'e67a2d73-d339-420a-aa87-9e3a649d8d4d',
        userName:	'asdasdasdasdasdasd',
        advantage:	'asdasdasdasdasdasd',
        disadvantage:	'asdasdasdasdasdasd',
        review:	'asdasdasdasdasdasd',
        rating:	2,
        createAt:	{
          dateTime: '2023-09-22T14:52:13.980Z',
          formatted: '22 сентября'
        },
        cameraId:	2
      }];
      expect(reviewsDataToReviewsList(test, 1, 2)).toEqual(expected);
    });
  });
});
