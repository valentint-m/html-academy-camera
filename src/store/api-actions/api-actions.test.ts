import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services/api';
import { AppThunkDispatch, extractActionsTypes, makeFakeCamera, makeFakePromo, makeFakeReview } from '../../utils/mocks';
import { State } from '../../types/state';
import { ApiRoute } from '../../const';
import { fetchCameraByIdAction, fetchCamerasAction, fetchPromoCamerasAction, fetchReviewsByIdAction, fetchSimilarCamerasByIdAction, orderCameraAction } from './api-actions';
import { getCameraReviewsUrlById, getCameraUrlById, getSimilarCamerasUrlById } from '../../utils/utils';
import { OrderInfo } from '../../types/camera';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ DATA: { cameras: [] }});
  });

  describe('Fetch actions: ', () => {
    describe('fetchCamerasAction', () => {
      it('should dispatch "fetchCamerasAction.pending", "fetchCamerasAction.fulfilled", when server response 200', async() => {
        const mockCameras = [makeFakeCamera()];
        mockAxiosAdapter.onGet(ApiRoute.Cameras).reply(200, mockCameras);

        await store.dispatch(fetchCamerasAction());

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const fetchCamerasActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchCamerasAction.fulfilled>;

        expect(extractedActionsTypes).toEqual([
          fetchCamerasAction.pending.type,
          fetchCamerasAction.fulfilled.type,
        ]);

        expect(fetchCamerasActionFulfilled.payload)
          .toEqual(mockCameras);
      });

      it('should dispatch "fetchCamerasAction.pending", "fetchCamerasAction.rejected" when server response 400', async () => {
        mockAxiosAdapter.onGet(ApiRoute.Cameras).reply(400, []);

        await store.dispatch(fetchCamerasAction());
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchCamerasAction.pending.type,
          fetchCamerasAction.rejected.type,
        ]);
      });
    });

    describe('fetchCameraByIdAction', () => {
      it('should dispatch "fetchCameraByIdAction.pending", "fetchCameraByIdAction.fulfilled", when server response 200', async() => {
        const mockCamera = makeFakeCamera();
        const cameraId = 1;
        mockAxiosAdapter.onGet(getCameraUrlById(cameraId)).reply(200, mockCamera);

        await store.dispatch(fetchCameraByIdAction(cameraId));

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const fetchCameraByIdActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchCameraByIdAction.fulfilled>;

        expect(extractedActionsTypes).toEqual([
          fetchCameraByIdAction.pending.type,
          fetchCameraByIdAction.fulfilled.type,
        ]);

        expect(fetchCameraByIdActionFulfilled.payload)
          .toEqual(mockCamera);
      });

      it('should dispatch "fetchCameraByIdAction.pending", "fetchCameraByIdAction.rejected" when server response 400', async () => {
        const cameraId = 1;
        mockAxiosAdapter.onGet(getCameraUrlById(cameraId)).reply(400, []);

        await store.dispatch(fetchCameraByIdAction(cameraId));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchCameraByIdAction.pending.type,
          fetchCameraByIdAction.rejected.type,
        ]);
      });
    });

    describe('fetchSimilarCamerasByIdAction', () => {
      it('should dispatch "fetchSimilarCamerasByIdAction.pending", "fetchSimilarCamerasByIdAction.fulfilled", when server response 200', async() => {
        const cameraId = 1;
        const mockCameras = [makeFakeCamera()];
        mockAxiosAdapter.onGet(getSimilarCamerasUrlById(cameraId)).reply(200, mockCameras);

        await store.dispatch(fetchSimilarCamerasByIdAction(cameraId));

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const fetchSimilarCamerasByIdActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchSimilarCamerasByIdAction.fulfilled>;

        expect(extractedActionsTypes).toEqual([
          fetchSimilarCamerasByIdAction.pending.type,
          fetchSimilarCamerasByIdAction.fulfilled.type,
        ]);

        expect(fetchSimilarCamerasByIdActionFulfilled.payload)
          .toEqual(mockCameras);
      });

      it('should dispatch "fetchSimilarCamerasByIdAction.pending", "fetchSimilarCamerasByIdAction.rejected" when server response 400', async () => {
        const cameraId = 1;
        mockAxiosAdapter.onGet(getSimilarCamerasUrlById(cameraId)).reply(400, []);

        await store.dispatch(fetchSimilarCamerasByIdAction(cameraId));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchSimilarCamerasByIdAction.pending.type,
          fetchSimilarCamerasByIdAction.rejected.type,
        ]);
      });
    });

    describe('fetchReviewsByIdAction', () => {
      it('should dispatch "fetchReviewsByIdAction.pending", "fetchReviewsByIdAction.fulfilled", when server response 200', async() => {
        const cameraId = 1;
        const mockReviews = [makeFakeReview()];
        mockAxiosAdapter.onGet(getCameraReviewsUrlById(cameraId)).reply(200, mockReviews);

        await store.dispatch(fetchReviewsByIdAction(cameraId));

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const fetchReviewsByIdActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviewsByIdAction.fulfilled>;

        expect(extractedActionsTypes).toEqual([
          fetchReviewsByIdAction.pending.type,
          fetchReviewsByIdAction.fulfilled.type,
        ]);

        expect(fetchReviewsByIdActionFulfilled.payload)
          .toEqual(mockReviews);
      });

      it('should dispatch "fetchReviewsByIdAction.pending", "fetchReviewsByIdAction.rejected" when server response 400', async () => {
        const cameraId = 1;
        mockAxiosAdapter.onGet(getCameraReviewsUrlById(cameraId)).reply(400, []);

        await store.dispatch(fetchReviewsByIdAction(cameraId));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchReviewsByIdAction.pending.type,
          fetchReviewsByIdAction.rejected.type,
        ]);
      });
    });

    describe('fetchPromoCamerasAction', () => {
      it('should dispatch "fetchPromoCamerasAction.pending", "fetchPromoCamerasAction.fulfilled", when server response 200', async() => {
        const mockPromos = [makeFakePromo()];
        mockAxiosAdapter.onGet(ApiRoute.Promo).reply(200, mockPromos);

        await store.dispatch(fetchPromoCamerasAction());

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const fetchPromoCamerasActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchPromoCamerasAction.fulfilled>;

        expect(extractedActionsTypes).toEqual([
          fetchPromoCamerasAction.pending.type,
          fetchPromoCamerasAction.fulfilled.type,
        ]);

        expect(fetchPromoCamerasActionFulfilled.payload)
          .toEqual(mockPromos);
      });

      it('should dispatch "fetchPromoCamerasAction.pending", "fetchPromoCamerasAction.rejected" when server response 400', async () => {
        mockAxiosAdapter.onGet(ApiRoute.Promo).reply(400, []);

        await store.dispatch(fetchPromoCamerasAction());
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchPromoCamerasAction.pending.type,
          fetchPromoCamerasAction.rejected.type,
        ]);
      });
    });
  });

  describe('Post actions:', () => {
    describe('orderCameraAction', () => {
      it('should dispatch "orderCameraAction.pending", "orderCameraAction.fulfilled" when server response 201', async() => {
        const fakeOrder: OrderInfo = { camerasIds: [1], coupon: null, tel: '+79998887776' };
        mockAxiosAdapter.onPost(ApiRoute.Orders).reply(201);

        await store.dispatch(orderCameraAction(fakeOrder));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          orderCameraAction.pending.type,
          orderCameraAction.fulfilled.type,
        ]);
      });

      it('should dispatch "orderCameraAction.pending", "orderCameraAction.rejected" when server response 400', async () => {
        const fakeOrder: OrderInfo = { camerasIds: [], coupon: null, tel: '+79998887776' };
        mockAxiosAdapter.onPost(ApiRoute.Orders).reply(400);

        await store.dispatch(orderCameraAction(fakeOrder));

        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          orderCameraAction.pending.type,
          orderCameraAction.rejected.type,
        ]);
      });
    });

  });

});
