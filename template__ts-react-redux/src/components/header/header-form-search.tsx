import classNames from 'classnames';
import { IconClose } from '../icon-components/icon-close';
import { useAppSelector } from '../../hooks/typed-wrappers';
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RouterPaths } from '../../consts/router-paths';
import { getSearchedProducts } from '../../utils/get-searched-products';
import { FormEvent } from 'react';

export function HeaderFormSearch ():JSX.Element {

  const navigate = useNavigate();
  const products = useAppSelector((state) => state.DATA.productsList.data);
  const [isSelectListShown, setIsSelectListShown] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<number>(-1);
  const [searchText, setSearchText] = useState<string>('');
  const selectList = useRef<HTMLUListElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);


  const searchTextChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setSearchText(evt.target.value);
    if (evt.target.value.length >= 3) {
      setIsSelectListShown(true);
    } else {
      if (isSelectListShown) {
        setIsSelectListShown(false);
      }
    }
  };
  const filteredProducts = getSearchedProducts(products, searchText);

  const clearButtonClickHandler = () => {
    setSearchText('');
    setIsSelectListShown(false);
    searchInput.current?.focus();
  };
  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const listSelectKeyDownHandler = (e: KeyboardEvent) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'].includes(e.key)) {
      e.preventDefault();
      setSelectedItem((prev) => {
        let nextItemNumber: number;
        if (!selectList.current?.children.length) {
          return -1;
        }
        if (['ArrowDown', 'ArrowRight'].includes(e.key)) {
          nextItemNumber = (prev + 1) < selectList.current?.children.length ? prev + 1 : 0;
        } else {
          nextItemNumber = (prev - 1) >= 0 ? prev - 1 : selectList.current?.children.length - 1;
        }
        (selectList.current?.children[nextItemNumber] as HTMLLIElement).focus();
        return nextItemNumber;
      });
    }
    if (e.key === 'Enter') {
      navigate(RouterPaths.product((selectList.current?.children[selectedItem] as HTMLLIElement).id));
    }
  };

  return(
    <div className={classNames('form-search', {'list-opened': isSelectListShown && filteredProducts.length})}>
      <form onSubmit={formSubmitHandler}>
        <label>
          <svg className="form-search__icon" width={16} height={16} aria-hidden="true">
            <use xlinkHref="#icon-lens" />
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            value={searchText}
            onChange={searchTextChangeHandler}
            onKeyDown={listSelectKeyDownHandler}
            ref={searchInput}
          />
        </label>
        <ul className="form-search__select-list"
          ref={selectList}
          onKeyDown={listSelectKeyDownHandler}
        >
          {filteredProducts.map((product) => (
            <li key={product.id} id={product.id.toString()} className="form-search__select-item" tabIndex={0}>
              <Link to={RouterPaths.product(product.id)} tabIndex={-1}>{product.name}</Link>
            </li>
          ))}
        </ul>
      </form>
      <button
        className="form-search__reset"
        type="reset"
        onClick={clearButtonClickHandler}
        data-testid="searchResetButton"
        style={{display: searchText.length ? 'flex' : 'none'}}
      >
        <IconClose/>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

