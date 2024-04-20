import { useRef } from 'react';
import { IconClose } from '../icon-components/icon-close';
import { IconReviewSuccess } from '../icon-components/icon-review-success';
import { useAppDispatch } from '../../hooks/typed-wrappers';
import { removeModal } from '../../store/actions';
import { useNavigate } from 'react-router-dom';
import { RouterPaths } from '../../consts/router-paths';

export default function PopupBasketSuccess ():JSX.Element {

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
      <p className="title title--h4">Спасибо за покупку</p>
      <span tabIndex={1} onFocus={() => {
        focusElements.lastFocusElement.current?.focus();
      }}
      />
      <IconReviewSuccess/>
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

