import { Link } from 'react-router-dom';
import { RouterPaths } from '../../consts/router-paths';
import { HeaderFormSearch } from './header-form-search';
import { IconBasket } from '../icon-components/icon-basket';
import { Basket } from '../../store/local-storage';
import { useEffect, useState } from 'react';

export function Header ():JSX.Element {

  const [basketCount, setBasketCount] = useState(Basket.getBasketData().camerasIds.length);

  const updateHeader = () => {
    setBasketCount(Basket.getBasketData().camerasIds.length);
  };

  useEffect(() => {
    window.addEventListener('onStorage', updateHeader);
    return () => {
      window.removeEventListener('onStorage', updateHeader);
    };
  });

  return (
    <header className="header" id="header">
      <div className="container">
        <Link className="header__logo" to={RouterPaths.catalog()} aria-label="Переход на главную">
          <svg width={100} height={36} aria-hidden="true">
            <use xlinkHref="#icon-logo" />
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to={RouterPaths.catalog()}>Каталог</Link>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="#">Гарантии</a>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="#">Доставка</a>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="#">О компании</a>
            </li>
          </ul>
        </nav>
        <HeaderFormSearch/>
        <Link className="header__basket-link" to={RouterPaths.basket()}>
          <IconBasket/>
          {basketCount ? <span className="header__basket-count">{basketCount}</span>
            : false}
        </Link>
      </div>
    </header>
  );
}

