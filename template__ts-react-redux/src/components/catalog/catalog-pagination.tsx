import { useSearchParams } from 'react-router-dom';
import { getPaginationInfo } from '../../utils/get-pagination-info';
import classNames from 'classnames';
import { PAGES_PER_ROW, PRODUCTS_PER_PAGE } from '../../consts/global';

type CatalogPaginationProps = {
  listLength: number;
}
export const CatalogPagination:React.FC<CatalogPaginationProps> = ({listLength}: CatalogPaginationProps) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') || 1);

  const paginationInfo = getPaginationInfo(currentPage, listLength, PRODUCTS_PER_PAGE, PAGES_PER_ROW);

  const changePageHandler = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>, changeType: 'prev'|'next'|'target', target: null | number = null) => {
    evt.preventDefault();
    if (paginationInfo) {
      let searchParam: number;
      switch (changeType) {
        case 'next':
          searchParam = (paginationInfo.pageNumbers[paginationInfo.pageNumbers.length - 1] + 1);
          break;
        case 'prev':
          searchParam = (paginationInfo.pageNumbers[0] - 1);
          break;
        case 'target':
          if (target) {
            searchParam = target;
          } else {
            throw Error('target page number is null');
          }
          break;
      }
      setSearchParams((prevParams) => {
        prevParams.set('page', searchParam.toString());
        return prevParams;
      });
    }
  };

  return (
    <div className="pagination">
      {paginationInfo ?
        <ul className="pagination__list">
          {paginationInfo.prevButton ?
            <li className="pagination__item">
              <a
                className="pagination__link pagination__link--text"
                onClick={(evt) => changePageHandler(evt, 'prev')}
                href="#"
              >Назад
              </a>
            </li> : false}
          {paginationInfo.pageNumbers.map((pageNumber) => (
            <li key={pageNumber} className="pagination__item">
              <a
                className={classNames('pagination__link', {'pagination__link--active': currentPage === pageNumber})}
                onClick={(evt) => {
                  changePageHandler(evt, 'target', pageNumber);
                }}
                href="#"
              >{pageNumber}
              </a>
            </li>
          ))}
          {paginationInfo.nextButton ?
            <li className="pagination__item">
              <a
                className="pagination__link pagination__link--text"
                onClick={(evt) => changePageHandler(evt, 'next')}
                href="#"
              >Далее
              </a>
            </li> : false}
        </ul> : false}
    </div>
  );
};
