import { ApiRoute, PRODUCT_PATH } from '../const';

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

export { getCameraUrlById, getSimilarCamerasUrlById, getCameraReviewsUrlById, getCameraPathById };
