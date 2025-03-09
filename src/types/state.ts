import { store } from '../store/index.js';
import { CameraInfo, ReviewInfo } from './camera.js';

export type CameraData = {
  cameras: CameraInfo[];
  cameraById: CameraInfo;
  similarCameras: CameraInfo[];
  reviews: ReviewInfo[];
  isCamerasDataLoading: boolean;
  hasError: boolean;
  isSubmitting: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
