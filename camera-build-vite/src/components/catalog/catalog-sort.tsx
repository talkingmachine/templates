import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/typed-wrappers';
import { IconSort } from '../icon-components/icon-sort';
import { SortDirection, SortType } from '../../consts/enums';
import { sortProductsList } from '../../store/actions';
import { useSearchParams } from 'react-router-dom';

export function CatalogSort ():JSX.Element {

  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortType, setSortType] = useState<SortType | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection | null>(null);

  const updateSortType = (newSortType: SortType) => {
    setSortType(newSortType);
    if (!sortDirection) {
      setSortDirection(SortDirection.Ascending);
    }
    dispatch(sortProductsList({
      sortType: newSortType,
      sortDirection: sortDirection ? sortDirection : SortDirection.Ascending
    }));
  };

  const updateSortDirection = (newSortDirection: SortDirection) => {
    setSortDirection(newSortDirection);
    if (!sortType) {
      setSortType(SortType.Price);
    }
    dispatch(sortProductsList({
      sortType: sortType ? sortType : SortType.Price,
      sortDirection: newSortDirection
    }));
  };

  const changeSortTypeHandler = (newSortType: SortType) => {
    updateSortType(newSortType);
    setSearchParams((prevParams) => {
      prevParams.set('sortType', newSortType);
      return prevParams;
    });
  };

  const changeSortDirectionHandler = (newSortDirection: SortDirection) => {
    updateSortDirection(newSortDirection);
    setSearchParams((prevParams) => {
      prevParams.set('sortDirection', newSortDirection.toString());
      return prevParams;
    });
  };

  useEffect(() => {
    const sortTypeParam = searchParams.get('sortType');
    const sortDirectionParam = searchParams.get('sortDirection');
    if (!(sortTypeParam || sortDirectionParam)) {
      setSortType(null);
      setSortDirection(null);
    } else {
      const newSortType = sortTypeParam ? sortTypeParam as SortType : null;
      const newSortDirection = sortDirectionParam ? Number(sortDirectionParam) : null;
      if (newSortType) {
        setSortType(newSortType);
        if (!sortDirection) {
          setSortDirection(SortDirection.Ascending);
        }
      }
      if (newSortDirection) {
        setSortDirection(newSortDirection);
        if (!sortType) {
          setSortType(SortType.Price);
        }
      }
      dispatch(sortProductsList({
        sortType: newSortType ? newSortType : SortType.Price,
        sortDirection: newSortDirection ? newSortDirection : SortDirection.Ascending
      }));
    }
  }, [dispatch, searchParams, sortDirection, sortType]);

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name="sort"
                checked={sortType === SortType.Price}
                onChange={() => changeSortTypeHandler(SortType.Price)}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                checked={sortType === SortType.Popular}
                onChange={() => changeSortTypeHandler(SortType.Popular)}
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="sort-icon"
                aria-label="По возрастанию"
                checked={sortDirection === SortDirection.Ascending}
                onChange={() => changeSortDirectionHandler(SortDirection.Ascending)}
              />
              <label htmlFor="up">
                <IconSort/>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                name="sort-icon"
                aria-label="По убыванию"
                checked={sortDirection === SortDirection.Descending}
                onChange={() => changeSortDirectionHandler(SortDirection.Descending)}
              />
              <label htmlFor="down">
                <IconSort/>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
