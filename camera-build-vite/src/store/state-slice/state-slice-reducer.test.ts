import { statesInitialState } from '../../consts/global';
import { showModal } from '../actions';
import { statesSlice } from './state-slice-reducer';

describe('Reducer: user interaction slice', () => {
  it('should return default state when action type is uknown', () => {
    expect(statesSlice.reducer(undefined, {type: 'UKNOWN_STATE'}))
      .toEqual(statesInitialState);
  });

  it('should return JSX.Element when showModel action is called', () => {
    const testInitialState = statesInitialState;
    const expectedState = {
      isNarrow: false,
      popup: {} as JSX.Element,
    };
    const result = statesSlice.reducer(testInitialState, showModal({} as JSX.Element));
    expect(result.popupInfo).toStrictEqual(expectedState);
  });
});
