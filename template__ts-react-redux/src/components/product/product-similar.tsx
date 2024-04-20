import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/typed-wrappers';
import { getSimilarList } from '../../store/api-actions';
import { formatProductData } from '../../utils/data-formatting';
import { showModal } from '../../store/actions';
import { CatalogCardData } from '../../types/data-types';
import { PopupAddItem } from '../popups/popup-add-item';
import { Status, StatusMessages } from '../../consts/enums';
import { LoadingSpinner } from '../loading-spinner';


export function ProductSimilar ():JSX.Element {

  const dispatch = useAppDispatch();
  const productId = useAppSelector((state) => state.DATA.product.data).id;
  const similarListData = useAppSelector((state) => state.DATA.similarList);
  const similarCardsList = similarListData.data.map(formatProductData);
  const buttonPrevElement = useRef<HTMLButtonElement>(null);
  const buttonNextElement = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (productId) {
      dispatch(getSimilarList({id: productId}));
    }
  }, [dispatch, productId]);

  const buyButtonClickHandler = (catalogCardData: CatalogCardData) => {
    dispatch(showModal(<PopupAddItem catalogCardData={catalogCardData}/>));
  };


  if (similarListData.status === Status.pending) {
    return (
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <LoadingSpinner/>
          </div>
        </div>
      </section>
    );
  } else if (similarListData.status === Status.rejected) {
    return (
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <div className="title title--h5">Ошибка: {StatusMessages.similarListRejected}</div>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
        </div>
      </section>
    );
  }
}


