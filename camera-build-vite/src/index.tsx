import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app/app';
import { store } from './store';
import { getProductsList, getPromoList } from './store/api-actions';
import { Provider } from 'react-redux';

store.dispatch(getProductsList());
store.dispatch(getPromoList());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
