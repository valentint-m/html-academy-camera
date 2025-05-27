import { store } from '../store/index';
import { CameraInCart, CameraInfo, PromoInfo, ReviewInfo } from './camera';

export type CameraData = {
  cameras: CameraInfo[];
  cameraById: CameraInfo;
  similarCameras: CameraInfo[];
  camerasInCart: CameraInCart[];
  reviews: ReviewInfo[];
  promoCameras: PromoInfo[];
  isCamerasDataLoading: boolean;
  hasError: boolean;
  isSubmitting: boolean;
};

export type CameraCartCount = {
  id: number;
  number: number;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
