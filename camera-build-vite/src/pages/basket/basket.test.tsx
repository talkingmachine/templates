import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { dataInitialState, statesInitialState } from '../../consts/global';
import BasketPage from './basket';
import userEvent from '@testing-library/user-event';


describe('Component: Basket', () => {
  const mockStore = configureMockStore();
  let store: ReturnType<typeof mockStore>;
  beforeAll(() => {
    store = mockStore({
      DATA: dataInitialState,
      STATES: statesInitialState,
    });
  });

  it('should render correctly', () => {
    const expectedText = [
      'Корзина',
      'Если у вас есть промокод на скидку, примените его в этом поле',
      'Промокод',
      'Применить',
      'Оформить заказ'
    ];
    render(
      <Provider store={store}>
        <BrowserRouter>
          <BasketPage/>
        </BrowserRouter>
      </Provider>
    );
    for (let i = 0; i < expectedText.length; i++) {
      expect(screen.getByText(expectedText[i])).toBeInTheDocument();
    }
  });

  it('should add or remove items from basket', async () => {
    localStorage.setItem('1','2');
    render(
      <Provider store={store}>
        <BrowserRouter>
          <BasketPage/>
        </BrowserRouter>
      </Provider>
    );
    await userEvent.click(screen.getByTestId('basketAddItem'));
    expect((screen.getByTestId('basketCountInput') as {value?: string}).value).toStrictEqual('3');
    await userEvent.click(screen.getByTestId('basketRemoveItem'));
    await userEvent.click(screen.getByTestId('basketRemoveItem'));
    expect((screen.getByTestId('basketCountInput') as {value?: string}).value).toStrictEqual('1');
  });

  it('should accept promocode input', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <BasketPage/>
        </BrowserRouter>
      </Provider>
    );
    await userEvent.type(screen.getByPlaceholderText('Введите промокод'), 'test me somehow..');
    expect((screen.getByPlaceholderText('Введите промокод') as {value?: string}).value).toStrictEqual('test me somehow..');
  });
});
