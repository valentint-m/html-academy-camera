import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../types/state';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute } from '../../const';
import { CameraInfo, OrderInfo, PromoInfo, ReviewInfo } from '../../types/camera';
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

export const fetchPromoCamerasAction = createAsyncThunk<PromoInfo[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromoCamerasAction',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<PromoInfo[]>(ApiRoute.Promo);
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
