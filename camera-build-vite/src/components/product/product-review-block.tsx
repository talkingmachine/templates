import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/typed-wrappers';
import { getReviewsList } from '../../store/api-actions';
import { Rating } from '../rating';
import { reviewsDataToReviewsList } from '../../utils/data-formatting';
import { REVIEWS_PER_PAGE } from '../../consts/global';
import { showModal } from '../../store/actions';
import { PopupAddReview } from '../popups/popup-add-review';
import { Status, StatusMessages } from '../../consts/enums';
import { LoadingSpinner } from '../loading-spinner';


type ProductReviewBlockProps = {
  id: number;
}
export const ProductReviewBlock:React.FC<ProductReviewBlockProps> = ({id}: ProductReviewBlockProps) => {

  const dispatch = useAppDispatch();
  const reviewsListData = useAppSelector((state) => state.DATA.reviewsList);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsList = reviewsDataToReviewsList(reviewsListData.data, currentPage, REVIEWS_PER_PAGE);

  const showMoreButtonClickHandler = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const newReviewButtonClickHandler = () => {
    dispatch(showModal(<PopupAddReview cameraId={id}/>));
  };

  useEffect(() => {
    dispatch(getReviewsList({id}));
  }, [dispatch, id]);


  if (reviewsListData.status === Status.pending) {
    return (
      <section className="review-block">
        <div className="container">
          <LoadingSpinner/>
        </div>
      </section>
    );
  } else if (reviewsListData.status === Status.rejected) {
    return (
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button" onClick={newReviewButtonClickHandler}>Оставить свой отзыв</button>
          </div>
          <div className="title title--h5">Ошибка: {StatusMessages.reviewsListRejected}</div>
        </div>
      </section>
    );
  } else {
    return (
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button" onClick={newReviewButtonClickHandler}>Оставить свой отзыв</button>
          </div>
          <ul className="review-block__list">
            {reviewsList.map((review) => (
              <li key={review.id} className="review-card">
                <div className="review-card__head">
                  <p className="title title--h4">{review.userName}</p>
                  <time className="review-card__data" dateTime={review.createAt.dateTime}>{review.createAt.formatted}</time>
                </div>
                <div className="rate review-card__rate">
                  <Rating rating={review.rating}/>
                  <p className="visually-hidden">Оценка: {review.rating}</p>
                </div>
                <ul className="review-card__list">
                  <li className="item-list"><span className="item-list__title">Достоинства:</span>
                    <p className="item-list__text">{review.advantage}</p>
                  </li>
                  <li className="item-list"><span className="item-list__title">Недостатки:</span>
                    <p className="item-list__text">{review.disadvantage}</p>
                  </li>
                  <li className="item-list"><span className="item-list__title">Комментарий:</span>
                    <p className="item-list__text">{review.review}</p>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
          {currentPage * REVIEWS_PER_PAGE < reviewsListData.data.length ?
            <div className="review-block__buttons">
              <button
                className="btn btn--purple"
                type="button"
                onClick={showMoreButtonClickHandler}
              >Показать больше отзывов
              </button>
            </div> : false}
        </div>
      </section>
    );
  }
};


