import { FormEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/typed-wrappers';
import { checkCoupons } from '../../store/api-actions';
import classNames from 'classnames';
import { Status } from '../../consts/enums';
import { Basket } from '../../store/local-storage';

export default function BasketPromo ():JSX.Element {

  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const couponCheckStatus = useAppSelector((state) => state.STATES.couponCheckStatus);
  const [promoDiscount, setPromoDiscount] = useState(Basket.getPromoDiscount());

  const buttonSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      const coupon = inputRef.current.value.replaceAll(' ', '');
      Basket.setPromo(coupon);
      dispatch(checkCoupons({
        couponData: {
          coupon
        }
      }));
    }
  };
  const updatePromo = () => {
    setPromoDiscount(Basket.getPromoDiscount());
  };

  useEffect(() => {
    window.addEventListener('onPromo', updatePromo);
    return () => {
      window.removeEventListener('onPromo', updatePromo);
    };
  });

  return (
    <div className="basket__promo">
      <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
      <div className="basket-form">
        <form onSubmit={buttonSubmitHandler}>
          <div
            className={classNames(
              'custom-input',
              {'is-valid': promoDiscount && couponCheckStatus === Status.downloaded},
              {'is-invalid': couponCheckStatus === Status.rejected}
            )}
          >
            <label>
              <span className="custom-input__label">Промокод</span>
              <input
                type="text"
                name="promo"
                placeholder="Введите промокод"
                ref={inputRef}
              />
            </label>
            <p className="custom-input__error">Промокод неверный</p>
            <p className="custom-input__success">Промокод принят!</p>
          </div>
          <button
            className="btn"
            type="submit"
          >Применить
          </button>
        </form>
      </div>
    </div>
  );
}

