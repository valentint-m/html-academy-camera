import { ApiRoute, DEFAULT_DOCUMENT_TITLE, PRODUCT_PATH } from '../const';
import { ReviewInfo } from '../types/camera';

function getCameraUrlById (id: number) {
  return `${ApiRoute.Cameras}${id}`;
}

function getSimilarCamerasUrlById (id: number) {
  return `${ApiRoute.Cameras}${id}${ApiRoute.SimilarCameras}`;
}

function getCameraReviewsUrlById (id: number) {
  return `${ApiRoute.Cameras}${id}${ApiRoute.Reviews}`;
}

function getCameraPathById (id: number) {
  return `${PRODUCT_PATH}${id}`;
}

function getFormattedDate (dateString: string) {
  const date = new Date(dateString);

  const formatter = new Intl.DateTimeFormat('ru', {
    day: '2-digit',
    month: 'long',
  });

  const formattedDate = formatter.format(date);

  return formattedDate;
}

function sortReviewsByLatest (reviews: ReviewInfo[]) {
  const reviewsCopy = Array.from(reviews);

  const sortedReviews = reviewsCopy.sort((reviewsA, reviewsB) => {
    const newDateA = new Date(reviewsA.createAt);
    const newDateB = new Date(reviewsB.createAt);
    return newDateB > newDateA ? 1 : -1;
  });
  return sortedReviews;
}

function getDocumentTitle (pageName: string) {
  return `${pageName} - ${DEFAULT_DOCUMENT_TITLE}`;
}

export { getCameraUrlById, getSimilarCamerasUrlById, getCameraReviewsUrlById, getCameraPathById, getFormattedDate, sortReviewsByLatest, getDocumentTitle };
