import { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/typed-wrappers';
import { Basket } from '../../store/local-storage';
import { formatPrice, formatTypeAndCategory } from '../../utils/data-formatting';
import { IconArrow } from '../icon-components/icon-arrow';
import { IconClose } from '../icon-components/icon-close';
import { Picture } from '../picture';
import { showModal } from '../../store/actions';
import { PopupBasketRemoveItem } from '../popups/popup-basket-remove-item';
import { ProductData } from '../../types/data-types';

export default function BasketList ():JSX.Element {

  const dispatch = useAppDispatch();
  const productsList = useAppSelector((state) => state.DATA.productsList.data);
  const basketItems = productsList.filter((product) => Basket.getItem(product.id));

  const [basketItemsCount, setBasketItemsCount] = useState<{[key: number]: number | ''}>(Basket.getItems());

  const updateBasket = () => {
    setBasketItemsCount(Basket.getItems());
  };
  const buttonAddClickHandler = (id: number) => {
    Basket.addItem(id);
  };
  const buttonRemoveClickHandler = (id: number) => {
    Basket.removeItem(id);
  };
  const buttonRemoveAllClickHandler = (basketItem: ProductData) => {
    dispatch(showModal(<PopupBasketRemoveItem productData={basketItem}/>));
  };
  const countChangeHandler = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    let value = Number(e.target.value);
    if (value > 99) {
      value = 99;
    }
    setBasketItemsCount((prev) => ({
      ...prev,
      [id]: value >= 1 ? value : ''
    }));
  };
  const countBlurHandler = (e: FocusEvent<HTMLInputElement>, id: number) => {
    let value = Math.round(Number(e.target.value));
    if (!value || value < 1) {
      value = 1;
    }
    Basket.setItem(id, value);
  };

  useEffect(() => {
    window.addEventListener('onStorage', updateBasket);
    return () => {
      window.removeEventListener('onStorage', updateBasket);
    };
  });


  return (
    <ul className="basket__list">
      {basketItems.map((basketItem) => (
        <li key={basketItem.id} className="basket-item">
          <div className="basket-item__img">
            <Picture
              previewImgWebp={basketItem.previewImgWebp}
              previewImgWebp2x={basketItem.previewImgWebp2x}
              previewImg={basketItem.previewImg}
              previewImg2x={basketItem.previewImg2x}
              imageParams={{
                width: 140,
                height: 120,
                alt: basketItem.name
              }}
            />
          </div>
          <div className="basket-item__description">
            <p className="basket-item__title">{basketItem.name}</p>
            <ul className="basket-item__list">
              <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{basketItem.vendorCode}</span>
              </li>
              <li className="basket-item__list-item">{formatTypeAndCategory(basketItem.type, basketItem.category)}</li>
              <li className="basket-item__list-item">{`${basketItem.level} уровень`}</li>
            </ul>
          </div>
          <p className="basket-item__price"><span className="visually-hidden">Цена:</span>
            {`${formatPrice(basketItem.price)} ₽`}
          </p>
          <div className="quantity">
            <button
              className="btn-icon btn-icon--prev"
              aria-label="уменьшить количество товара"
              data-testid='basketRemoveItem'
              onClick={() => buttonRemoveClickHandler(basketItem.id)}
              disabled={!Number(basketItemsCount[basketItem.id]) ||
                basketItemsCount[basketItem.id] as number <= 1}
            >
              <IconArrow/>
            </button>
            <label className="visually-hidden" htmlFor="counter1" />
            <input
              type="number"
              id="counter1"
              data-testid='basketCountInput'
              value={basketItemsCount[basketItem.id].toString()}
              min={1}
              max={99}
              aria-label="количество товара"
              onChange={(e) => countChangeHandler(e, basketItem.id)}
              onBlur={(e) => countBlurHandler(e, basketItem.id)}
            />
            <button
              className="btn-icon btn-icon--next"
              aria-label="увеличить количество товара"
              data-testid='basketAddItem'
              onClick={() => buttonAddClickHandler(basketItem.id)}
              disabled={!Number(basketItemsCount[basketItem.id]) ||
                basketItemsCount[basketItem.id] as number >= 99}
            >
              <IconArrow/>
            </button>
          </div>
          <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>
            {`${formatPrice(basketItem.price * (basketItemsCount[basketItem.id] as number))} ₽`}
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Удалить товар"
            onClick={() => buttonRemoveAllClickHandler(basketItem)}
          >
            <IconClose/>
          </button>
        </li>
      ))}
    </ul>
  );
}

