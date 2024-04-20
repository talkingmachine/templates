import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/typed-wrappers';
import { IconClose } from '../icon-components/icon-close';
import { useRef } from 'react';
import { removeModal } from '../../store/actions';
import { RouterPaths } from '../../consts/router-paths';

export default function PopupBasketReject ():JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const focusElements = {
    firstFocusElement: useRef<HTMLButtonElement>(null),
    lastFocusElement: useRef<HTMLButtonElement>(null),
  };

  const closePopupHandler = () => {
    dispatch(removeModal());
  };
  const continueButtonHandler = () => {
    if (location.pathname !== RouterPaths.catalog()) {
      navigate(RouterPaths.catalog());
    }
    closePopupHandler();
  };

  return (
    <div className="modal__content">
      <p className="title title--h4">Произошла ошибка!</p>
      <p className="title--h4">Пожалуйста, попробйуте позже</p>
      <span tabIndex={1} onFocus={() => {
        focusElements.lastFocusElement.current?.focus();
      }}
      />
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          tabIndex={2}
          autoFocus
          onClick={continueButtonHandler}
          ref={focusElements.firstFocusElement}
        >Вернуться к покупкам
        </button>
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Закрыть попап"
        tabIndex={3}
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
}

