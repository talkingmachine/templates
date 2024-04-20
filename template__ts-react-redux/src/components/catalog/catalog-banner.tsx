import { useAppSelector } from '../../hooks/typed-wrappers';
import { Link } from 'react-router-dom';
import { RouterPaths } from '../../consts/router-paths';
import { Picture } from '../picture';
import { ImagesParams } from '../../consts/global';
import { Status, StatusMessages } from '../../consts/enums';
import { LoadingSpinner } from '../loading-spinner';

export function CatalogBanner ():JSX.Element {

  const promoDataList = useAppSelector((state) => state.DATA.promoList);

  if (promoDataList.status === Status.pending) {
    return (
      <div className="banner">
        <LoadingSpinner/>
      </div>
    );
  } else if (promoDataList.status === Status.rejected) {
    return (
      <div className="banner">
        <p className="title title--h5 banner__info">Ошибка: {StatusMessages.promoListRejected}</p>
      </div>
    );
  } else {
    return (
      <div>
        banner
      </div>
    );
  }


}

