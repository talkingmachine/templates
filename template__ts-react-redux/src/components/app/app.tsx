import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RouterPaths } from '../../consts/router-paths';
import { Modal } from '../popups/modal';
import { NotFoundPage } from '../../pages/not-found/not-found';
import { ScrollToTop } from '../scroll-top';
import { Suspense, lazy } from 'react';
import { LoadingSpinner } from '../loading-spinner';
import { ToastContainer } from 'react-toastify';

const ProductPage = lazy(() => import ('../../pages/product/product'));
const CatalogPage = lazy(() => import ('../../pages/catalog/catalog'));
const BasketPage = lazy(() => import ('../../pages/basket/basket'));

export function App ():JSX.Element {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <ToastContainer/>
      <Routes>
        <Route
          path={RouterPaths.catalog()}
          element={<Suspense fallback={<LoadingSpinner/>}><CatalogPage/></Suspense>}
        />
        <Route
          path={RouterPaths.productWithAnyId()}
          element={<Suspense fallback={<LoadingSpinner/>}><ProductPage/></Suspense>}
        />
        <Route
          path={RouterPaths.basket()}
          element={<Suspense fallback={<LoadingSpinner/>}><BasketPage/></Suspense>}
        />
        <Route path={RouterPaths.notFound()} element={<NotFoundPage/>}/>
      </Routes>
      <Modal/>
    </BrowserRouter>
  );
}

