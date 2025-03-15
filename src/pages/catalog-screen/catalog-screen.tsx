import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getCameras, getPromoCameras } from '../../store/camera-data/camera-data-selectors';
import { CameraInfo } from '../../types/camera';
import { Link } from 'react-router-dom';
import { getCameraPathById } from '../../utils/utils';
import CatalogCallItemPopup from '../../components/catalog-call-item-popup/catalog-call-item-popup';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ProductList from '../../components/product-list/product-list';

export default function CatalogScreen (): JSX.Element {
  const [selectedCamera, setCamera] = useState<CameraInfo | undefined>(undefined);
  const [isPopupActive, setPopupActive] = useState(false);

  const cameras = useAppSelector(getCameras);
  const promoCamera = useAppSelector(getPromoCameras)[0];

  function getPromoCameraInfo (promoId: number): CameraInfo | undefined {
    return cameras.find((camera) => camera.id === promoId);
  }

  function handleCallButtonClick (camera: CameraInfo) {
    setPopupActive(true);
    setCamera(camera);
  }

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="banner">
          <picture>
            <source type="image/webp" srcSet={`${promoCamera.previewImgWebp}, ${promoCamera.previewImgWebp2x} 2x`} /><img src={promoCamera.previewImg} srcSet={`${promoCamera.previewImg2x} 2x`} width="1280" height="280" alt="баннер" />
          </picture>
          <p className="banner__info"><span className="banner__message">Новинка!</span><span className="title title--h1">{getPromoCameraInfo(promoCamera.id)?.name}</span><span className="banner__text">{getPromoCameraInfo(promoCamera.id)?.description}</span><Link className="btn" to={getCameraPathById(promoCamera.id)}>Подробнее</Link></p>
        </div>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="index.html">Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
                </li>
              </ul>
            </div>
          </div>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside"><img src="img/banner.png" />
                </div>
                <div className="catalog__content">

                  <ProductList cameras={cameras} handleCallButtonClick={handleCallButtonClick} />

                </div>
              </div>
            </div>
          </section>
        </div>
        {isPopupActive && selectedCamera && <CatalogCallItemPopup camera={selectedCamera} />}
      </main>
      <Footer />
    </div>
  );
}
