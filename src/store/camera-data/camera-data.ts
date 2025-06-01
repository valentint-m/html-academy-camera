import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CameraCartCount, CameraData } from '../../types/state';
import { fetchCameraByIdAction, fetchCamerasAction, fetchPromoCamerasAction, fetchReviewsByIdAction, fetchSimilarCamerasByIdAction, orderCameraAction } from '../api-actions/api-actions';
import { CameraInfo, PromoInfo, ReviewInfo } from '../../types/camera';

const initialState: CameraData = {
  cameras: [],
  cameraById: {
    id: 0,
    name: '',
    vendorCode: '',
    type: '',
    category: '',
    description: '',
    level: '',
    price: 0,
    rating: 0,
    reviewCount: 0,
    previewImg: '',
    previewImg2x: '',
    previewImgWebp: '',
    previewImgWebp2x: '',
  },
  similarCameras: [],
  camerasInCart: [],
  reviews: [],
  promoCameras: [],
  isCamerasDataLoading: false,
  hasError: false,
  isSubmitting: false,
  hasFulfilledSubmitting: false,
  hasRejectedSubmitting: false,
};

export const cameraData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    addCameraToCart: (state, action: PayloadAction<CameraInfo | undefined>) => {
      if (!action.payload) {
        return;
      }

      for (let i = 0; i < state.camerasInCart.length; i++) {
        if (state.camerasInCart[i].camera.id === action.payload.id) {
          state.camerasInCart[i].number++;
          return;
        }
      }
      state.camerasInCart.push({camera: action.payload, number: 1});
    },

    setCameraInCartCount: (state, action: PayloadAction<CameraCartCount>) => {
      for (let i = 0; i < state.camerasInCart.length; i++) {
        if (state.camerasInCart[i].camera.id === action.payload.id) {
          state.camerasInCart[i].number = action.payload.number;
          break;
        }
      }
    },

    decreaseCameraInCartCount: (state, action: PayloadAction<number | undefined>) => {
      for (let i = 0; i < state.camerasInCart.length; i++) {
        if (state.camerasInCart[i].camera.id === action.payload) {
          state.camerasInCart[i].number--;
          break;
        }
      }
    },

    removeCameraFromCart: (state, action: PayloadAction<number>) => {
      const camerasInCartCopy = [...state.camerasInCart];
      let deletedCameraInCartIndex: number | undefined = undefined;

      for (let i = 0; i < state.camerasInCart.length; i++) {
        if (state.camerasInCart[i].camera.id === action.payload) {
          deletedCameraInCartIndex = i;
          break;
        }
      }

      if (deletedCameraInCartIndex !== undefined) {
        camerasInCartCopy.splice(deletedCameraInCartIndex, 1);
        state.camerasInCart = camerasInCartCopy;
      }
    },

    clearCamerasInCart: (state) => {
      state.camerasInCart = [];
    },

    resetSubmissionStatuses: (state) => {
      state.hasFulfilledSubmitting = false;
      state.hasRejectedSubmitting = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isCamerasDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action: PayloadAction<CameraInfo[]>) => {
        state.cameras = action.payload;
        state.isCamerasDataLoading = false;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.isCamerasDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchCameraByIdAction.pending, (state) => {
        state.isCamerasDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchCameraByIdAction.fulfilled, (state, action: PayloadAction<CameraInfo>) => {
        state.cameraById = action.payload;
        state.isCamerasDataLoading = false;
      })
      .addCase(fetchCameraByIdAction.rejected, (state) => {
        state.isCamerasDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchSimilarCamerasByIdAction.pending, (state) => {
        state.isCamerasDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchSimilarCamerasByIdAction.fulfilled, (state, action: PayloadAction<CameraInfo[]>) => {
        state.similarCameras = action.payload;
        state.isCamerasDataLoading = false;
      })
      .addCase(fetchSimilarCamerasByIdAction.rejected, (state) => {
        state.isCamerasDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchReviewsByIdAction.pending, (state) => {
        state.isCamerasDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchReviewsByIdAction.fulfilled, (state, action: PayloadAction<ReviewInfo[]>) => {
        state.reviews = action.payload;
        state.isCamerasDataLoading = false;
      })
      .addCase(fetchReviewsByIdAction.rejected, (state) => {
        state.isCamerasDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchPromoCamerasAction.pending, (state) => {
        state.hasError = false;
      })
      .addCase(fetchPromoCamerasAction.fulfilled, (state, action: PayloadAction<PromoInfo[]>) => {
        state.promoCameras = action.payload;
      })
      .addCase(fetchPromoCamerasAction.rejected, (state) => {
        state.hasError = true;
      })
      .addCase(orderCameraAction.pending, (state) => {
        state.isSubmitting = true;
        state.hasFulfilledSubmitting = false;
        state.hasRejectedSubmitting = false;
        state.hasError = false;
      })
      .addCase(orderCameraAction.fulfilled, (state) => {
        state.hasFulfilledSubmitting = true;
        state.isSubmitting = false;
      })
      .addCase(orderCameraAction.rejected, (state) => {
        state.hasRejectedSubmitting = true;
        state.isSubmitting = false;
      });
  }
});

export const { addCameraToCart, clearCamerasInCart } = cameraData.actions;

