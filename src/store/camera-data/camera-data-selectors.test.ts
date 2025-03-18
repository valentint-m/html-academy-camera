import { NameSpace } from '../../const';
import { makeFakeCamera, makeFakePromo, makeFakeReview } from '../../utils/mocks';
import { getCameras, getCameraById, getPromoCameras, getSimilarCameras, getReviews, getCamerasDataLoadingStatus, getSubmittingStatus, getErrorStatus } from './camera-data-selectors';

describe('CameraData selectors:', () => {
  const mockCamera = makeFakeCamera();
  const mockSimilarCamera = makeFakeCamera();
  const mockReview = makeFakeReview();
  const mockPromoCamera = makeFakePromo();

  const state = {
    [NameSpace.Data]: {
      cameras: [mockCamera],
      cameraById: mockCamera,
      similarCameras: [mockSimilarCamera],
      reviews: [mockReview],
      promoCameras: [mockPromoCamera],
      isCamerasDataLoading: false,
      hasError: false,
      isSubmitting: false,
    }
  };

  describe('Get data selectors:', () => {
    it('should return cameras from state.', () => {
      const { cameras } = state[NameSpace.Data];
      const result = getCameras(state);
      expect(result).toEqual(cameras);
    });

    it('should return camera by id from state.', () => {
      const { cameraById } = state[NameSpace.Data];
      const result = getCameraById(state);
      expect(result).toEqual(cameraById);
    });

    it('should return promo cameras from state.', () => {
      const { promoCameras } = state[NameSpace.Data];
      const result = getPromoCameras(state);
      expect(result).toEqual(promoCameras);
    });

    it('should return similar cameras from state.', () => {
      const { similarCameras } = state[NameSpace.Data];
      const result = getSimilarCameras(state);
      expect(result).toEqual(similarCameras);
    });

    it('should return reviews from state.', () => {
      const { reviews } = state[NameSpace.Data];
      const result = getReviews(state);
      expect(result).toEqual(reviews);
    });
  });

  describe('Check status selectors:', () => {
    it('should return cameras loading status from state.', () => {
      const { isCamerasDataLoading } = state[NameSpace.Data];
      const result = getCamerasDataLoadingStatus(state);
      expect(result).toBe(isCamerasDataLoading);
    });

    it('should return submitting status from state.', () => {
      const { isSubmitting } = state[NameSpace.Data];
      const result = getSubmittingStatus(state);
      expect(result).toBe(isSubmitting);
    });

    it('should return error status from state.', () => {
      const { hasError } = state[NameSpace.Data];
      const result = getErrorStatus(state);
      expect(result).toBe(hasError);
    });
  });

});
