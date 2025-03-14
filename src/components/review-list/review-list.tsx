import { ReviewInfo } from '../../types/camera';
import ReviewCard from '../review-card/review-card';

type ReviewListProps = {
  reviews: ReviewInfo[];
  showCount: number;
}

export default function ReviewList ({reviews, showCount}: ReviewListProps): JSX.Element {
  return (
    <ul className="review-block__list">
      {reviews.map((review, reviewIndex) => reviewIndex < showCount && <ReviewCard reviewInfo={review} key={review.id}/>)}
    </ul>
  );
}
