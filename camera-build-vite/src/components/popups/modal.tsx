import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/typed-wrappers';
import { removeModal } from '../../store/actions';
import { getScrollbarWidth } from '../../utils/utils';

export function Modal ():JSX.Element {

  const dispatch = useAppDispatch();
  const popupInfo = useAppSelector((state) => state.STATES.popupInfo);

  const modalRemoveHandler = (evt: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>) => {
    if ('key' in evt) {
      if (evt.key === 'Escape') {
        dispatch(removeModal());
      }
    } else {
      dispatch(removeModal());
    }
  };

  if (popupInfo.popup) {
    const padding = getScrollbarWidth();
    document.body.style.overflowY = 'hidden';
    document.body.style.paddingRight = `${padding}px`;
    return (
      <div
        className={classNames('modal is-active', {'modal--narrow': popupInfo.isNarrow})}
        onKeyDown={modalRemoveHandler}
      >
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={modalRemoveHandler}/>
          {popupInfo.popup}
        </div>
      </div>);
  } else {
    document.body.style.overflowY = 'scroll';
    document.body.style.paddingRight = '0';
    return (
      <>
      </>);
  }
}

