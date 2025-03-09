import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../types/state';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute } from '../../const';
import { store } from '..';
import { CameraInfo, CouponInfo, OrderInfo, ReviewInfo, ReviewPostInfo } from '../../types/camera';
import { getCameraReviewsUrlById, getCameraUrlById, getSimilarCamerasUrlById } from '../../utils/utils';

export const fetchCamerasAction = createAsyncThunk<CameraInfo[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameras',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<CameraInfo[]>(ApiRoute.Cameras);
    return data;
  },
);

export const fetchCameraByIdAction = createAsyncThunk<CameraInfo, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameraById',
  async (cameraId, {extra: api}) => {
    const {data} = await api.get<CameraInfo>(getCameraUrlById(cameraId));
    return data;
  }
);

export const fetchSimilarCamerasByIdAction = createAsyncThunk<CameraInfo[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarCamerasByIdAction',
  async (cameraId, {extra: api}) => {
    const {data} = await api.get<CameraInfo[]>(getSimilarCamerasUrlById(cameraId));
    return data;
  }
);

export const fetchReviewsByIdAction = createAsyncThunk<ReviewInfo[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviewsByIdAction',
  async (cameraId, {extra: api}) => {
    const {data} = await api.get<ReviewInfo[]>(getCameraReviewsUrlById(cameraId));
    return data;
  }
);

export const postReviewAction = createAsyncThunk<ReviewInfo, ReviewPostInfo, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postReviewAction',
  async (reviewPostInfo, {extra: api}) => {
    const {data} = await api.post<ReviewInfo>(ApiRoute.Reviews, reviewPostInfo);
    store.dispatch(fetchReviewsByIdAction(reviewPostInfo.cameraId));
    return data;
  },
);

export const orderCameraAction = createAsyncThunk<void, OrderInfo, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/orderCameraAction',
  async (orderInfo, {extra: api}) => {
    await api.post<OrderInfo>(ApiRoute.Orders, orderInfo);
  },
);

export const checkCouponAction = createAsyncThunk<number, CouponInfo, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/checkCouponAction',
  async (couponInfo, {extra: api}) => {
    const data: number = await api.post(ApiRoute.Coupons, couponInfo);
    return data;
  },
);
