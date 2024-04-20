import { useEffect } from 'react';
import { Breadcrumbs } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header/header';
import { ProductSimilar } from '../../components/product/product-similar';
import { ProductReviewBlock } from '../../components/product/product-review-block';
import { useAppDispatch, useAppSelector } from '../../hooks/typed-wrappers';
import { formatProductData } from '../../utils/data-formatting';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getProduct } from '../../store/api-actions';
import { Rating } from '../../components/rating';
import { Picture } from '../../components/picture';
import classNames from 'classnames';
import { Status, Tabs } from '../../consts/enums';
import { CatalogCardData } from '../../types/data-types';
import { PopupAddItem } from '../../components/popups/popup-add-item';
import { showModal } from '../../store/actions';
import { IconAddBasket } from '../../components/icon-components/icon-add-basket';
import { APP_NAME, ImagesParams } from '../../consts/global';
import { RouterPaths } from '../../consts/router-paths';
import { LoadingSpinner } from '../../components/loading-spinner';

export default function ProductPage ():JSX.Element {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const productPageId = Number(useParams().id || -1);
  const productData = useAppSelector((state) => state.DATA.product);
  const activeTab = searchParams.get('tab');
  const setActiveTab = (tab: Tabs) => setSearchParams({tab});
  let productPageInfo: CatalogCardData;

  useEffect(() => {
    if (productPageId && productData.data) {
      if (productData.data.id !== productPageId) {
        dispatch(getProduct({id: productPageId}));
      }
      document.title = productData.data.name;
    }
    return () => {
      document.title = APP_NAME;
    };
  }, [dispatch, productData, productPageId]);

  const addToCartClickHandler = (catalogCardData: CatalogCardData) => {
    dispatch(showModal(<PopupAddItem catalogCardData={catalogCardData}/>));
  };

  const scrollUpButtonHandler = () => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
      left: 0,
    });
  };

  if (productData.status === Status.downloaded) {
    productPageInfo = formatProductData(productData.data);
    return (
      <div className="wrapper">
        <Header/>
        <main>
          <div className="page-content">
            <div className="breadcrumbs">
              <div className="container">
                <Breadcrumbs productPageInfo={productPageInfo}/>
              </div>
            </div>
            <div className="page-content__section">
              <section className="product">
                <div className="container">
                  <div className="product__img">
                    <Picture
                      previewImgWebp = {productPageInfo.previewImgWebp} previewImgWebp2x = {productPageInfo.previewImgWebp2x}
                      previewImg = {productPageInfo.previewImg} previewImg2x = {productPageInfo.previewImg2x}
                      imageParams={{
                        ...ImagesParams.productPage.productContainer,
                        alt: productPageInfo.name
                      }}
                    />
                  </div>
                  <div className="product__content">
                    <h1 className="title title--h3">{productPageInfo.name}</h1>
                    <div className="rate product__rate">
                      <Rating rating={productPageInfo.rating}/>
                      <p className="visually-hidden">Рейтинг: {productPageInfo.rating}</p>
                      <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{productPageInfo.reviewCount}</p>
                    </div>
                    <p className="product__price"><span className="visually-hidden">Цена:</span>{productPageInfo.price} ₽</p>
                    <button className="btn btn--purple" type="button" onClick={() => addToCartClickHandler(productPageInfo)}>
                      <IconAddBasket/>
                      Добавить в корзину
                    </button>
                    <div className="tabs product__tabs">
                      <div className="tabs__controls product__tabs-controls">
                        <button
                          className={classNames('tabs__control', {'is-active' : activeTab === Tabs.details})}
                          onClick={() => setActiveTab(Tabs.details)}
                          type="button"
                        >Характеристики
                        </button>
                        <button
                          className={classNames('tabs__control', {'is-active' : !activeTab || activeTab === Tabs.description})}
                          type="button"
                          onClick={() => setActiveTab(Tabs.description)}
                        >Описание
                        </button>
                      </div>
                      <div className="tabs__content">
                        <div className={classNames('tabs__element', {'is-active' : activeTab === Tabs.details})} data-testid='descriptionList'>
                          <ul className="product__tabs-list" >
                            <li className="item-list"><span className="item-list__title">Артикул:</span>
                              <p className="item-list__text"> {productPageInfo.vendorCode}</p>
                            </li>
                            <li className="item-list"><span className="item-list__title">Категория:</span>
                              <p className="item-list__text">{productPageInfo.category}</p>
                            </li>
                            <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                              <p className="item-list__text">{productPageInfo.type}</p>
                            </li>
                            <li className="item-list"><span className="item-list__title">Уровень:</span>
                              <p className="item-list__text">{productPageInfo.level}</p>
                            </li>
                          </ul>
                        </div>
                        <div className={classNames('tabs__element', {'is-active' : !activeTab || activeTab === Tabs.description})}>
                          <div className="product__tabs-text">
                            {productPageInfo.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="page-content__section">
              <ProductSimilar/>
            </div>
            <div className="page-content__section">
              <ProductReviewBlock id={productPageInfo.id}/>
            </div>
          </div>
        </main>
        <a
          className="up-btn"
          onClick={scrollUpButtonHandler}
        >
          <svg width={12} height={18} aria-hidden="true">
            <use xlinkHref="#icon-arrow2"/>
          </svg>
        </a>
        <Footer/>
      </div>
    );
  } else if (productData.status === Status.pending) {
    return (
      <LoadingSpinner/>
    );
  } else {
    navigate(RouterPaths.notFound());
    return (
      <>
      </>
    );
  }
}

