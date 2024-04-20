import { getRatingNumbersArray } from '../consts/global';

type ProductRateProps = {
  rating: number;
}
export const Rating:React.FC<ProductRateProps> = ({rating}: ProductRateProps) => (
  <>
    {getRatingNumbersArray.map((star) =>
      (
        <svg key={star} width={17} height={16} aria-hidden="true">
          <use xlinkHref={rating >= star ? '#icon-full-star' : '#icon-star'} />
        </svg>
      ))}
  </>
);
