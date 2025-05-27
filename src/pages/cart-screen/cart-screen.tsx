import { Link } from 'react-router-dom';
import { Path } from '../../const';
import { useAppSelector } from '../../hooks';
import { getCamerasInCart } from '../../store/camera-data/camera-data-selectors';
import { CameraInfo } from '../../types/camera';
import { useEffect, useState } from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import CartSummary from '../../components/cart-summary/cart-summary';
import CartList from '../../components/cart-list/cart-list';
import CartRemoveItemPopup from '../../components/cart-remove-item-popup/cart-remove-item-popup';
import { scrollToTop } from '../../utils/utils';

export default function CartScreen (): JSX.Element {
  const camerasInCart = useAppSelector(getCamerasInCart);

  const [selectedCamera, setCamera] = useState<CameraInfo | undefined>(undefined);
  const [isPopupRemoveCameraActive, setPopupRemoveCameraActive] = useState(false);

  useEffect(() => {
    scrollToTop();
  }, []);

  function handleRemoveButtonClick (camera: CameraInfo) {
    setPopupRemoveCameraActive(true);
    setCamera(camera);
  }

  function handleModalRemoveCameraClose () {
    setPopupRemoveCameraActive(false);
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

        {isPopupRemoveCameraActive && selectedCamera && <CartRemoveItemPopup camera={selectedCamera} onCloseModal={handleModalRemoveCameraClose} />}

      </main>
      <Footer />
    </div>
  );
}
