import { fireEvent, render, screen } from '@testing-library/react';
import { HeaderFormSearch } from './header-form-search';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { ProductCategory, ProductLevel, ProductType, Status } from '../../consts/enums';

const mockData = {
  productsList: {
    data: [
      {
        id: 1,
        name: 'TESTOD LNME',
        vendorCode: 'DA4IU67AD5',
        type: ProductType['Коллекционная'],
        category: ProductCategory['Видеокамера'],
        description: 'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди коллекционеров и яростных почитателей старинной техники.',
        level: ProductLevel['Нулевой'],
        price: 65000,
        rating: 5,
        reviewCount: 16,
        previewImg: 'img/content/das-auge.jpg',
        previewImg2x: 'img/content/das-auge@2x.jpg',
        previewImgWebp: 'img/content/das-auge.webp',
        previewImgWebp2x: 'img/content/das-auge@2x.webp'
      },
      {
        id: 2,
        name: '12093ERLAS B',
        vendorCode: 'DA4IUdAD5',
        type: ProductType['Коллекционная'],
        category: ProductCategory['Видеокамера'],
        description: 'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди коллекционеров и яростных почитателей старинной техники.',
        level: ProductLevel['Нулевой'],
        price: 65000,
        rating: 5,
        reviewCount: 16,
        previewImg: 'img/content/das-auge.jpg',
        previewImg2x: 'img/content/das-auge@2x.jpg',
        previewImgWebp: 'img/content/das-auge.webp',
        previewImgWebp2x: 'img/content/das-auge@2x.webp'
      },
      {
        id: 3,
        name: 'CLEPQ TEST',
        vendorCode: 'DA4IU6aAD5',
        type: ProductType['Коллекционная'],
        category: ProductCategory['Видеокамера'],
        description: 'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди коллекционеров и яростных почитателей старинной техники.',
        level: ProductLevel['Нулевой'],
        price: 65000,
        rating: 5,
        reviewCount: 16,
        previewImg: 'img/content/das-auge.jpg',
        previewImg2x: 'img/content/das-auge@2x.jpg',
        previewImgWebp: 'img/content/das-auge.webp',
        previewImgWebp2x: 'img/content/das-auge@2x.webp'
      }
    ],
    status: Status.default
  },
};

describe('Component: HeaderFormSearch', () => {
  const mockStore = configureMockStore();
  const store = mockStore({
    DATA: mockData,
  });
  const setup = () => {
    const utils = render(
      <Provider store={store}>
        <BrowserRouter>
          <HeaderFormSearch/>
        </BrowserRouter>
      </Provider>
    );
    const input = screen.getByPlaceholderText<HTMLInputElement>('Поиск по сайту');
    const reset = screen.getByTestId('searchResetButton');
    return {
      input,
      reset,
      ...utils,
    };
  };

  it('should input correctly', () => {
    const {input} = setup();
    fireEvent.change(input, {target: {value: 'AB'}});
    expect(input.value).toBe('AB');
  });
  it('should search and show products with TEST-like names', () => {
    const {input} = setup();
    fireEvent.change(input, {target: {value: 'TEST'}});
    expect(screen.getByText(mockData.productsList.data[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockData.productsList.data[2].name)).toBeInTheDocument();
  });
  it('should search and show products with E-like names', () => {
    const {input} = setup();
    fireEvent.change(input, {target: {value: 'E'}});
    expect(screen.getByText(mockData.productsList.data[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockData.productsList.data[1].name)).toBeInTheDocument();
    expect(screen.getByText(mockData.productsList.data[2].name)).toBeInTheDocument();
  });
  it('should search and show products with 93 or Q names', () => {
    const {input} = setup();
    fireEvent.change(input, {target: {value: '93 Q'}});
    expect(screen.getByText(mockData.productsList.data[1].name)).toBeInTheDocument();
    expect(screen.getByText(mockData.productsList.data[2].name)).toBeInTheDocument();
  });

  it('should reset form when reset-button pressed', () => {
    const testValue = '1d5fDF';
    const {input, reset} = setup();
    fireEvent.change(input, {target: {value: testValue}});
    expect(input.value).toBe(testValue);
    fireEvent.click(reset);
    expect(input.value).toBe('');
  });
});

