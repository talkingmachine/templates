import { dataInitialState } from '../../consts/global';
import { dataSlice } from './data-slice-reducer';

describe('Reducer: data slice', () => {

  it('should return default state when action type is uknown', () => {
    expect(dataSlice.reducer(undefined, {type: 'UKNOWN_STATE'}))
      .toEqual(dataInitialState);
  });
});

