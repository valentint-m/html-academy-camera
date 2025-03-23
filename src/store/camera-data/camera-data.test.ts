import { makeFakeCamera } from '../../utils/mocks';
import { fetchCamerasAction } from '../api-actions/api-actions';
import { cameraData } from './camera-data';

describe('CameraData Slice', () => {
  describe('Empty actions:', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const mockCamera = makeFakeCamera();

      const expectedState = {
        cameras: [],
        cameraById: mockCamera,
        similarCameras: [],
        reviews: [],
        promoCameras: [],
        isCamerasDataLoading: false,
        hasError: false,
        isSubmitting: false,
      };

      const result = cameraData.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action', () => {
      const emptyAction = { type: '' };

      const expectedState = {
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
        reviews: [],
        promoCameras: [],
        isCamerasDataLoading: false,
        hasError: false,
        isSubmitting: false,
      };

      const result = cameraData.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });
  });

  describe('Fetch cameras action:', () => {
    it('should set "isCamerasDataLoading" to "true", "hasError" to "false" with "fetchCamerasAction.pending"', () => {
      const expectedState = {
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
        reviews: [],
        promoCameras: [],
        isCamerasDataLoading: true,
        hasError: false,
        isSubmitting: false,
      };

      const result = cameraData.reducer(undefined, fetchCamerasAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "cameras" to array with camera, "isCamerasDataLoading" to "false" with "fetchCamerasAction.fulfilled"', () => {
      const mockCamera = makeFakeCamera();
      const expectedState = {
        cameras: [mockCamera],
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
        reviews: [],
        promoCameras: [],
        isCamerasDataLoading: false,
        hasError: false,
        isSubmitting: false,
      };

      const result = cameraData.reducer(
        undefined,
        fetchCamerasAction.fulfilled(
          [mockCamera], '', undefined)
      );

      expect(result).toEqual(expectedState);
    });

    it('should set "isCamerasDataLoading" to "false", "hasError" to "true" with "fetchCamerasAction.rejected', () => {
      const expectedState = {
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
        reviews: [],
        promoCameras: [],
        isCamerasDataLoading: false,
        hasError: true,
        isSubmitting: false,
      };

      const result = cameraData.reducer(
        undefined,
        fetchCamerasAction.rejected
      );

      expect(result).toEqual(expectedState);
    });
  });

});
