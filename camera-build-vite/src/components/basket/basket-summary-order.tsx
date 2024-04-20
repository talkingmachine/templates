import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/typed-wrappers';
import { Basket } from '../../store/local-storage';
import { formatPrice } from '../../utils/data-formatting';
import { getDiscount, getPriceWithDiscount } from '../../utils/utils';
import classNames from 'classnames';
import { postOrder } from '../../store/api-actions';
import { Status } from '../../consts/enums';
import { resetPostOrderStatus, showModal } from '../../store/actions';
import PopupBasketSuccess from '../popups/popup-basket-success';
import PopupBasketReject from '../popups/popup-basket-reject';

export default function BasketSummaryOrder ():JSX.Element {

  const dispatch = useAppDispatch();
  const productsList = useAppSelector((state) => state.DATA.productsList.data);
  const postOrderStatus = useAppSelector((state) => state.STATES.postOrderStatus);
  const basketItems = productsList.filter((product) => Basket.getItem(product.id));
  const [basketItemsCount, setBasketItemsCount] = useState<{[key: number]: number | ''}>(Basket.getItems());
  const [basketCount, setBasketCount] = useState<number>(Basket.getLength());
  const [discount, setDiscount] = useState(Basket.getPromoDiscount());

  const basketPrice = basketItems.reduce((acc, item) =>
    acc + (item.price * (basketItemsCount[item.id] as number)), 0);

  const updateBasket = () => {
    setBasketItemsCount(Basket.getItems());
    setBasketCount(Basket.getLength());
  };
  const updatePromo = () => {
    setDiscount(Basket.getPromoDiscount());
  };
  const submitButtonClickHandler = () => {
    dispatch(postOrder({basketData: Basket.getBasketData()}));
  };


  useEffect(() => {
    window.addEventListener('onStorage', updateBasket);
    window.addEventListener('onPromo', updatePromo);
    return () => {
      window.removeEventListener('onStorage', updateBasket);
      window.removeEventListener('onPromo', updatePromo);
    };
  });

  useEffect(() => {
    if (postOrderStatus === Status.downloaded) {
      dispatch(showModal(<PopupBasketSuccess/>));
      dispatch(resetPostOrderStatus());
      Basket.resetBasket();
    } else if (postOrderStatus === Status.rejected) {
      dispatch(showModal(<PopupBasketReject/>));
      dispatch(resetPostOrderStatus());
    }
  }, [dispatch, postOrderStatus]);


  return (
    <div className="basket__summary-order">
      <p className="basket__summary-item">
        <span className="basket__summary-text">Всего:</span>
        <span className="basket__summary-value">{`${formatPrice(basketPrice)} ₽`}</span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text">Скидка:</span>
        <span
          className={classNames('basket__summary-value', {'basket__summary-value--bonus': discount > 0})}
        >
          {`${getDiscount(basketPrice, discount)} ₽`}
        </span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text basket__summary-text--total">
          К оплате:
        </span>
        <span className="basket__summary-value basket__summary-value--total">{`${getPriceWithDiscount(basketPrice, discount)} ₽`}</span>
      </p>
      <button
        className="btn btn--purple"
        type="submit"
        disabled={!basketCount}
        onClick={submitButtonClickHandler}
      >Оформить заказ
      </button>
    </div>
  );
}

