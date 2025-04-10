import { ApiRoute, DEFAULT_DOCUMENT_TITLE, PRODUCT_PATH, SortDirection, SortType } from '../const';
import { CameraInfo, ReviewInfo } from '../types/camera';

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

function getDocumentTitle (pageName: string) {
  return `${pageName} - ${DEFAULT_DOCUMENT_TITLE}`;
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

function sortCamerasByTypeAndDirection (cameras: CameraInfo[], type: SortType, direction: SortDirection) {
  const camerasCopy = Array.from(cameras);

  switch (direction) {
    case SortDirection.Up:
      camerasCopy.sort((cameraA, cameraB) => cameraA[type] - cameraB[type]);
      break;
    case SortDirection.Down:
      camerasCopy.sort((cameraA, cameraB) => cameraB[type] - cameraA[type]);
      break;
    default:
      break;
  }

  return camerasCopy;
}

export { getCameraUrlById, getSimilarCamerasUrlById, getCameraReviewsUrlById, getCameraPathById, getFormattedDate, getDocumentTitle, sortReviewsByLatest, sortCamerasByTypeAndDirection };
