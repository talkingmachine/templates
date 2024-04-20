import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/typed-wrappers';
import { removeModal } from '../../store/actions';
import { IconClose } from '../icon-components/icon-close';
import { useRef } from 'react';
import { RouterPaths } from '../../consts/router-paths';

export const PopupAddItemSuccess = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();


  const closePopupHandler = () => {
    dispatch(removeModal());
  };
  const toBasketClickHandler = () => {
    navigate(RouterPaths.basket());
    closePopupHandler();
  };
  const continueButtonHandler = () => {
    if (location.pathname !== RouterPaths.catalog()) {
      navigate(RouterPaths.catalog());
    }
    closePopupHandler();
  };

  const focusElements = {
    firstFocusElement: useRef<HTMLAnchorElement>(null),
    lastFocusElement: useRef<HTMLButtonElement>(null),
  };

  return (
    <div className="modal__content">
      <p className="title title--h4">Товар успешно добавлен в корзину</p>
      <span tabIndex={1} onFocus={() => {
        focusElements.lastFocusElement.current?.focus();
      }}
      />
      <svg className="modal__icon" width={86} height={80} aria-hidden="true">
        <use xlinkHref="#icon-success" />
      </svg>
      <div className="modal__buttons">
        <a
          className="btn btn--transparent modal__btn"
          tabIndex={2}
          ref={focusElements.firstFocusElement}
          onClick={continueButtonHandler}
        >Продолжить покупки
        </a>
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          tabIndex={3}
          autoFocus
          onClick={toBasketClickHandler}
        >Перейти в корзину
        </button>
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Закрыть попап"
        onClick={closePopupHandler}
        tabIndex={4}
        ref={focusElements.lastFocusElement}
      >
        <IconClose/>
      </button>
      <span tabIndex={5} onFocus={() => {
        focusElements.firstFocusElement.current?.focus();
      }}
      />
    </div>
  );
};
