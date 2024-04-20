import { Link, useLocation } from 'react-router-dom';
import { CatalogCardData } from '../types/data-types';
import { getBreadcrumbsData } from '../utils/utils';
import { IconArrowMini } from './icon-components/icon-arrow-mini';

type BreadcrumbsProps = {
  productPageInfo?: CatalogCardData;
}
export const Breadcrumbs:React.FC<BreadcrumbsProps> = ({productPageInfo}: BreadcrumbsProps) => {

  const pathname = useLocation().pathname;
  const breadcrumbsData = getBreadcrumbsData(pathname, productPageInfo);

  return (
    <ul className="breadcrumbs__list">
      {breadcrumbsData.map((breadcrumb) => (
        <li key={breadcrumb.name} className="breadcrumbs__item">
          {breadcrumb.isLast ?
            <span className="breadcrumbs__link breadcrumbs__link--active">{breadcrumb.name}</span> :
            <Link className="breadcrumbs__link" to={breadcrumb.path}>{breadcrumb.name}
              <IconArrowMini/>
            </Link>}
        </li>
      ))}
    </ul>
  );
};
