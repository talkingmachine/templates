import { ProductData } from '../types/data-types';
import { getPriceLimiters } from './get-info-from-products';

describe('Get info from products', () => {
  it('should return min max limiters from products list', () => {
    const tests = [
      { price: 3 },
      { price: 66 },
      { price: 1 },
      { price: 4 },
      { price: 7 },
    ] as ProductData[];
    expect(getPriceLimiters(tests)).toEqual({
      min: 1,
      max: 66
    });
  });
});
