import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { State } from '../types/state';
import { createAPI } from '../services/api';
import { system, name, internet, date } from 'faker';
import { CameraInfo, PromoInfo, ReviewInfo } from '../types/camera';

export const makeFakeCamera = (): CameraInfo => ({
  id: 1,
  name: name.title(),
  vendorCode: internet.ip(),
  type: name.jobType(),
  category: name.jobTitle(),
  description: name.jobDescriptor(),
  level: name.jobArea(),
  price: 1,
  rating: 1,
  reviewCount: 1,
  previewImg: system.filePath(),
  previewImg2x: system.filePath(),
  previewImgWebp: system.filePath(),
  previewImgWebp2x: system.filePath(),
} as CameraInfo);

export const makeFakeReview = (): ReviewInfo => ({
  id: system.fileName(),
  createAt: date.recent().toDateString(),
  cameraId: 1,
  userName: internet.userName(),
  advantage: name.jobDescriptor(),
  disadvantage: name.jobTitle(),
  review: name.jobArea(),
  rating: 1,
} as ReviewInfo);

export const makeFakePromo = (): PromoInfo => ({
  id: 1,
  previewImg: system.filePath(),
  previewImg2x: system.filePath(),
  previewImgWebp: system.filePath(),
  previewImgWebp2x: system.filePath(),
} as PromoInfo);

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
