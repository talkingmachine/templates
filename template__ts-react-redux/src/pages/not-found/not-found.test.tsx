import { render, screen } from '@testing-library/react';
import { NotFoundPage } from './not-found';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { dataInitialState } from '../../consts/global';


describe('Component: NotFound', () => {
  const mockStore = configureMockStore();

  it('should render correctly', () => {
    const expectedHeaderText = '404 Not Found';
    const expectedLinkText = 'Вернуться на главную';
    const store = mockStore({
      DATA: dataInitialState,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <NotFoundPage/>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
