import { useRef } from 'react';
import { ImagesParams } from '../../consts/global';
import { useAppDispatch } from '../../hooks/typed-wrappers';
import { removeModal, setNarrow, showModal } from '../../store/actions';
import { CatalogCardData } from '../../types/data-types';
import { formatTypeAndCategory } from '../../utils/data-formatting';
import { IconAddBasket } from '../icon-components/icon-add-basket';
import { IconClose } from '../icon-components/icon-close';
import { Picture } from '../picture';
import { PopupAddItemSuccess } from './popup-add-item-success';
import { Basket } from '../../store/local-storage';


type PopupAddItemProps = {
  catalogCardData: CatalogCardData;
}
export const PopupAddItem:React.FC<PopupAddItemProps> = ({catalogCardData}: PopupAddItemProps) => {

  const dispatch = useAppDispatch();
  const closePopupHandler = () => {
    dispatch(removeModal());
  };

  const focusElements = {
    firstFocusElement: useRef<HTMLButtonElement>(null),
    lastFocusElement: useRef<HTMLButtonElement>(null),
  };

  const addItemClickHandler = () => {
    Basket.addItem(catalogCardData.id);
    dispatch(showModal(<PopupAddItemSuccess/>));
    dispatch(setNarrow());
  };

  return (
    <div className="modal__content">
      <p className="title title--h4">Добавить товар в корзину</p>
      <span tabIndex={1} onFocus={() => {
        focusElements.lastFocusElement.current?.focus();
      }}
      />
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <Picture
            previewImgWebp = {catalogCardData.previewImgWebp} previewImgWebp2x = {catalogCardData.previewImgWebp2x}
            previewImg = {catalogCardData.previewImg} previewImg2x = {catalogCardData.previewImg2x}
            imageParams={{
              ...ImagesParams.popups.addItem,
              alt: `${catalogCardData.type} ${catalogCardData.name}`
            }}
          />
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{catalogCardData.name}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item">
              <span className="basket-item__article">Артикул: </span>
              <span className="basket-item__number">{catalogCardData.vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{formatTypeAndCategory(catalogCardData.type, catalogCardData.category)}</li>
            <li className="basket-item__list-item">{catalogCardData.level} уровень</li>
          </ul>
          <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{catalogCardData.price} ₽</p>
        </div>
      </div>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          tabIndex={2}
          autoFocus
          ref={focusElements.firstFocusElement}
          onClick={addItemClickHandler}
        >
          <IconAddBasket/>
          Добавить в корзину
        </button>
      </div>
      <button
        className="cross-btn"
        type="button"
        tabIndex={3}
        aria-label="Закрыть попап"
        onClick={closePopupHandler}
        ref={focusElements.lastFocusElement}
      >
        <IconClose/>
      </button>
      <span tabIndex={4} onFocus={() => {
        focusElements.firstFocusElement.current?.focus();
      }}
      />
    </div>
  );
};

