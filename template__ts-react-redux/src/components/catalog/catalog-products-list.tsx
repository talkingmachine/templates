import { Link, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/typed-wrappers';
import { productsDataToCatalogList } from '../../utils/data-formatting';
import { CatalogPagination } from './catalog-pagination';
import { setFilterPriceLimiters, showModal } from '../../store/actions';
import { PopupAddItem } from '../popups/popup-add-item';
import { CatalogCardData } from '../../types/data-types';
import { RouterPaths } from '../../consts/router-paths';
import { Rating } from '../rating';
import { Picture } from '../picture';
import { ImagesParams, PRODUCTS_PER_PAGE } from '../../consts/global';
import { getFilteredProducts } from '../../utils/get-filtered-products';
import { getPriceLimiters } from '../../utils/get-info-from-products';
import { useEffect, useState } from 'react';
import { Status, StatusMessages } from '../../consts/enums';
import { LoadingSpinner } from '../loading-spinner';
import { IconBasket } from '../icon-components/icon-basket';
import { Basket } from '../../store/local-storage';

export function CatalogProductsList ():JSX.Element {

  const dispatch = useAppDispatch();
  const productsList = useAppSelector((state) => state.DATA.productsList);
  const [searchParams] = useSearchParams();
  const currentPage = +(searchParams.get('page') || 1);

  const [filteredArray, filteredByPriceArray] = getFilteredProducts(productsList.data, searchParams);
  const catalogCardsData = productsDataToCatalogList(filteredByPriceArray, currentPage, PRODUCTS_PER_PAGE);

  const [productsInBasket, setProductsInBasket] = useState<{[key: number]: number}>(Basket.getItems());

  const buyButtonClickHandler = (catalogCardData: CatalogCardData) => {
    dispatch(showModal(<PopupAddItem catalogCardData={catalogCardData}/>));
  };

  const updateButtons = () => {
    setProductsInBasket(Basket.getItems());
  };

  useEffect(() => {
    window.addEventListener('onStorage', updateButtons);
    return () => {
      window.removeEventListener('onStorage', updateButtons);
    };
  });

  useEffect(() => {
    dispatch(setFilterPriceLimiters(
      getPriceLimiters(filteredArray)
    ));
  }, [dispatch, filteredArray, productsList.status]);


  if (productsList.status === Status.pending) {
    return (
      <div className="cards catalog__cards">
        <LoadingSpinner/>
      </div>
    );
  } else if (productsList.status === Status.rejected) {
    return (
      <div className="cards catalog__cards">
        <div className="title title--h5">Ошибка: {StatusMessages.productsListRejected}</div>
      </div>
    );
  } else {
    return (
      <>
        <div className="cards catalog__cards">
          {catalogCardsData.length ? catalogCardsData.map((catalogCardData) => (
            <div key={catalogCardData.id} className="product-card">
              <div className="product-card__img">
                <Picture
                  previewImgWebp = {catalogCardData.previewImgWebp} previewImgWebp2x = {catalogCardData.previewImgWebp2x}
                  previewImg = {catalogCardData.previewImg} previewImg2x = {catalogCardData.previewImg2x}
                  imageParams={{
                    ...ImagesParams.catalogPage.productsList,
                    alt: catalogCardData.name
                  }}
                />
              </div>
              <div className="product-card__info">
                <div className="rate product-card__rate">
                  <Rating rating={catalogCardData.rating}/>
                  <p className="visually-hidden">Рейтинг: {catalogCardData.rating}</p>
                  <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{catalogCardData.reviewCount}</p>
                </div>
                <p className="product-card__title">{catalogCardData.name}</p>
                <p className="product-card__price"><span className="visually-hidden">Цена:</span>{catalogCardData.price} ₽
                </p>
              </div>
              <div className="product-card__buttons">
                {productsInBasket[catalogCardData.id] ?
                  <Link
                    className="btn btn--purple-border product-card__btn product-card__btn--in-cart"
                    to={RouterPaths.basket()}
                  >
                    <IconBasket/>
                    В корзине
                  </Link> :
                  <button
                    className="btn btn--purple product-card__btn"
                    type="button"
                    onClick={() => buyButtonClickHandler(catalogCardData)}
                  >Купить
                  </button>}
                <Link className="btn btn--transparent" to={RouterPaths.product(catalogCardData.id)}>Подробнее
                </Link>
              </div>
            </div>
          )) : <div className="title title--h5">По вашему запросу ничего не найдено</div>}
        </div>
        <CatalogPagination listLength={filteredByPriceArray.length}/>
      </>
    );
  }
}
