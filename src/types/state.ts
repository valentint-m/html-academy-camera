import { store } from '../store/index';
import { CameraInfo, PromoInfo, ReviewInfo } from './camera';

export type CameraData = {
  cameras: CameraInfo[];
  cameraById: CameraInfo;
  similarCameras: CameraInfo[];
  reviews: ReviewInfo[];
  promoCameras: PromoInfo[];
  isCamerasDataLoading: boolean;
  hasError: boolean;
  isSubmitting: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
