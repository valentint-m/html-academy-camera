import { ApiRoute } from '../const';

function getCameraUrlById (id: number) {
  return `${ApiRoute.Cameras}/${id}`;
}

function getSimilarCamerasUrlById (id: number) {
  return `${ApiRoute.Cameras}/${id}/${ApiRoute.SimilarCameras}`;
}

function getCameraReviewsUrlById (id: number) {
  return `${ApiRoute.Cameras}/${id}/${ApiRoute.Reviews}`;
}

export { getCameraUrlById, getSimilarCamerasUrlById, getCameraReviewsUrlById };
