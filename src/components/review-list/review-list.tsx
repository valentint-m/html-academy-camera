import { ReviewInfo } from '../../types/camera';
import ReviewCard from '../review-card/review-card';

type ReviewListProps = {
  reviews: ReviewInfo[];
}

export default function ReviewList ({reviews}: ReviewListProps): JSX.Element {
  return (
    <ul className="review-block__list">
      {reviews.map((review) => <ReviewCard reviewInfo={review} key={review.id}/>)}
    </ul>
  );
}
