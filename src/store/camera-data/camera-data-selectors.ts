import { NameSpace } from '../../const';
import { CameraInCart, CameraInfo, PromoInfo, ReviewInfo } from '../../types/camera';
import { State } from '../../types/state';
import { sortReviewsByLatest } from '../../utils/utils';

export const getCameras = (state: State): CameraInfo[] => state[NameSpace.Data].cameras;

export const getCameraById = (state: State): CameraInfo => state[NameSpace.Data].cameraById;

export const getSimilarCameras = (state: State): CameraInfo[] => state[NameSpace.Data].similarCameras;

export const getCamerasInCart = (state: State): CameraInCart[] => state[NameSpace.Data].camerasInCart;

export const getReviews = (state: State): ReviewInfo[] => sortReviewsByLatest(state[NameSpace.Data].reviews);

export const getPromoCameras = (state: State): PromoInfo[] => state[NameSpace.Data].promoCameras;

export const getCamerasDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isCamerasDataLoading;

export const getErrorStatus = (state: State): boolean => state[NameSpace.Data].hasError;

export const getSubmittingStatus = (state: State): boolean => state[NameSpace.Data].isSubmitting;

