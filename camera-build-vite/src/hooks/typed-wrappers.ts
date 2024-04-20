import { useSelector, useDispatch } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';
import { store } from '../store';

type AppDispatchType = typeof store.dispatch;
type StateType = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector;
