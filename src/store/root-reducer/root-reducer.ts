import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { cameraData } from '../camera-data/camera-data';

export const rootReducer = combineReducers({
  [NameSpace.Data]: cameraData.reducer,
});
