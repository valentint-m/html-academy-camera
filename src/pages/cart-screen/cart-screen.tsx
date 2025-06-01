import { Link } from 'react-router-dom';
import { Path } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCamerasInCart, getIsSubmissionFulfilledStatus, getIsSubmissionRejectedStatus, getSubmittingStatus } from '../../store/camera-data/camera-data-selectors';
import { CameraInfo } from '../../types/camera';
import { useEffect, useState } from 'react';
import { scrollToTop } from '../../utils/utils';
import { cameraData } from '../../store/camera-data/camera-data';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import CartSummary from '../../components/cart-summary/cart-summary';
import CartList from '../../components/cart-list/cart-list';
import CartRemoveItemPopup from '../../components/cart-remove-item-popup/cart-remove-item-popup';
import CartSuccessPopup from '../../components/cart-success-popup/cart-success-popup';
import CartErrorPopup from '../../components/cart-error-popup/cart-error-popup';
import CartPreloader from '../../components/cart-preloader/cart-preloader';

export default function CartScreen (): JSX.Element {
  const dispatch = useAppDispatch();

  const camerasInCart = useAppSelector(getCamerasInCart);

  const isOrderFullfilled = useAppSelector(getIsSubmissionFulfilledStatus);
  const isOrderRejected = useAppSelector(getIsSubmissionRejectedStatus);
  const isOrderSubmitting = useAppSelector(getSubmittingStatus);

  const [selectedCamera, setCamera] = useState<CameraInfo | undefined>(undefined);
  const [isPopupRemoveCameraActive, setPopupRemoveCameraActive] = useState<boolean>(false);
  const [isPopupOrderSuccessActive, setPopupOrderSuccessActive] = useState<boolean>(false);
  const [isPopupOrderErrorActive, setPopupOrderErrorActive] = useState<boolean>(false);

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    if (isOrderFullfilled) {
      setPopupOrderSuccessActive(true);
      dispatch(cameraData.actions.clearCamerasInCart());
      dispatch(cameraData.actions.resetSubmissionStatuses());
    }
  }, [dispatch, isOrderFullfilled]);

  useEffect(() => {
    if (isOrderRejected) {
      setPopupOrderErrorActive(true);
      dispatch(cameraData.actions.resetSubmissionStatuses());
    }
  }, [dispatch, isOrderRejected]);

  function handleRemoveButtonClick (camera: CameraInfo) {
    setPopupRemoveCameraActive(true);
    setCamera(camera);
  }

  function handleModalRemoveCameraClose () {
    setPopupRemoveCameraActive(false);
  }

  function handleModalOrderSuccessClose () {
    setPopupOrderSuccessActive(false);
  }

  function handleModalOrderErrorClose () {
    setPopupOrderErrorActive(false);
  }

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={Path.Catalog}>Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={Path.Catalog}>Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Корзина</span>
                </li>
              </ul>
            </div>
          </div>
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>

              <CartList camerasInCart={camerasInCart} onRemoveItemButtonClick={handleRemoveButtonClick} />
              <CartSummary camerasInCart={camerasInCart} />

            </div>
          </section>
        </div>

        {isOrderSubmitting && <CartPreloader /> }
        {isPopupRemoveCameraActive && selectedCamera && <CartRemoveItemPopup camera={selectedCamera} onCloseModal={handleModalRemoveCameraClose} />}
        {isPopupOrderSuccessActive && <CartSuccessPopup onCloseModal={handleModalOrderSuccessClose} />}
        {isPopupOrderErrorActive && <CartErrorPopup onCloseModal={handleModalOrderErrorClose} />}

      </main>
      <Footer />
    </div>
  );
}
