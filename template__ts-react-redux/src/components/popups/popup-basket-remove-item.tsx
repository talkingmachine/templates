import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/typed-wrappers';
import { removeModal } from '../../store/actions';
import { Basket } from '../../store/local-storage';
import { ProductData } from '../../types/data-types';
import { formatTypeAndCategory } from '../../utils/data-formatting';
import { IconClose } from '../icon-components/icon-close';
import { Picture } from '../picture';
import { RouterPaths } from '../../consts/router-paths';

type PopupBasketRemoveItemProps = {
  productData: ProductData;
}
export const PopupBasketRemoveItem:React.FC<PopupBasketRemoveItemProps> = ({productData}: PopupBasketRemoveItemProps) => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const closePopupHandler = () => {
    dispatch(removeModal());
  };
  const removeProduct = () => {
    Basket.removeAllItems(productData.id);
    closePopupHandler();
  };
  const continueButtonHandler = () => {
    if (location.pathname !== RouterPaths.catalog()) {
      navigate(RouterPaths.catalog());
    }
    closePopupHandler();
  };


  return (
    <div className="modal__content">
      <p className="title title--h4">Удалить этот товар?</p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <Picture
            previewImgWebp = {productData.previewImgWebp} previewImgWebp2x = {productData.previewImgWebp2x}
            previewImg = {productData.previewImg} previewImg2x = {productData.previewImg2x}
            imageParams={{
              width: 140,
              height: 120,
              alt: `${productData.type} ${productData.name}`
            }}
          />
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{productData.name}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{productData.vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{formatTypeAndCategory(productData.type, productData.category)}</li>
            <li className="basket-item__list-item">{`${productData.level} уровень`}</li>
          </ul>
        </div>
      </div>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--half-width"
          type="button"
          autoFocus
          onClick={removeProduct}
        >Удалить
        </button>
        <a
          className="btn btn--transparent modal__btn modal__btn--half-width"
          onClick={continueButtonHandler}
        >Продолжить покупки
        </a>
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Закрыть попап"
        onClick={closePopupHandler}
      >
        <IconClose/>
      </button>
    </div>
  );
};

