import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { CameraInfo, ReviewInfo } from '../../types/camera';
import { getCameraById, getReviews } from '../../store/camera-data/camera-data-selectors';
import { useEffect, useState } from 'react';
import { fetchCameraByIdAction, fetchReviewsByIdAction } from '../../store/api-actions/api-actions';
import { Path, REVIEWS_COUNT_DEFAULT } from '../../const';
import { getDocumentTitle, scrollToTop, scrollToTopEvent } from '../../utils/utils';
import { cameraData } from '../../store/camera-data/camera-data';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ReviewList from '../../components/review-list/review-list';
import CatalogAddItemPopup from '../../components/catalog-add-item-popup/catalog-add-item-popup';
import CatalogAddItemSuccessPopup from '../../components/catalog-add-item-success-popup/catalog-add-item-success-popup';

export default function ProductScreen (): JSX.Element {
  const pageId = Number(useParams().id);
  const dispatch = useAppDispatch();

  const [isPopupAddCameraActive, setPopupAddCameraActive] = useState(false);
  const [isPopupAddCameraSuccessActive, setPopupAddCameraSuccessActive] = useState(false);

  const [isSpecsActive, setSpecsActive] = useState(false);
  const [showCount, setShowCount] = useState(REVIEWS_COUNT_DEFAULT);

  const cameraById: CameraInfo = useAppSelector(getCameraById);
  const reviewsById: ReviewInfo[] = useAppSelector(getReviews);

  useEffect(() => {
    if (pageId !== cameraById.id && pageId) {
      dispatch(fetchCameraByIdAction(pageId));
      dispatch(fetchReviewsByIdAction(pageId));
    }
  }, [pageId, cameraById.id, dispatch]);

  useEffect(() => {
    scrollToTop();
    document.title = getDocumentTitle(cameraById.name);
  }, [cameraById.name]);

  function handleShowMoreReviewsButtonClick () {
    setShowCount(showCount + REVIEWS_COUNT_DEFAULT);
  }

  function handleSpecsButtonClick () {
    setSpecsActive(true);
  }

  function handleDescriptionButtonClick () {
    setSpecsActive(false);
  }

  function handleBuyButtonClick () {
    setPopupAddCameraActive(true);
  }

  function handleModalAddCameraClose () {
    setPopupAddCameraActive(false);
  }

  function handleAddCameraButtonClick () {
    handleModalAddCameraClose();
    setPopupAddCameraSuccessActive(true);
    dispatch(cameraData.actions.addCameraToCart(cameraById));
  }

  function handleModalAddCameraSuccessClose () {
    setPopupAddCameraSuccessActive(false);
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
                  <Link className="breadcrumbs__link" to={Path.Main}>Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={Path.Main}>Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">{cameraById.name}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source type="image/webp" srcSet={`${cameraById.previewImgWebp}, ${cameraById.previewImgWebp2x} 2x`} /><img src={`${cameraById.previewImg}`} srcSet={`${cameraById.previewImg2x} 2x`} width="560" height="480" alt={cameraById.name} />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{cameraById.name}</h1>
                  <div className="rate product__rate">
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                    <p className="visually-hidden">Рейтинг: {cameraById.rating}</p>
                    <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{cameraById.reviewCount}</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">Цена:</span>{`${cameraById.price} ₽`}</p>
                  <button className="btn btn--purple" type="button" onClick={handleBuyButtonClick}>
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>
                    Добавить в корзину
                  </button>
                  <div className="tabs product__tabs">
                    <div className="tabs__controls product__tabs-controls">
                      <button className={`tabs__control ${isSpecsActive ? 'is-active' : ''}`} type="button" onClick={handleSpecsButtonClick}>Характеристики</button>
                      <button className={`tabs__control ${!isSpecsActive ? 'is-active' : ''}`} type="button" onClick={handleDescriptionButtonClick}>Описание</button>
                    </div>
                    <div className="tabs__content">
                      <div className={`tabs__element ${isSpecsActive ? 'is-active' : ''}`}>
                        <ul className="product__tabs-list">
                          <li className="item-list"><span className="item-list__title">Артикул:</span>
                            <p className="item-list__text"> {cameraById.vendorCode}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Категория:</span>
                            <p className="item-list__text">{cameraById.category}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                            <p className="item-list__text">{cameraById.type}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Уровень:</span>
                            <p className="item-list__text">{cameraById.level}</p>
                          </li>
                        </ul>
                      </div>
                      <div className={`tabs__element ${!isSpecsActive ? 'is-active' : ''}`}>
                        <div className="product__tabs-text">
                          <p>{cameraById.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="page-content__section">
            <section className="review-block">
              <div className="container">
                <div className="page-content__headed">
                  <h2 className="title title--h3">Отзывы</h2>
                </div>

                <ReviewList reviews={reviewsById} showCount={showCount}/>

                <div className="review-block__buttons ">
                  <button className={`btn btn--purple ${reviewsById.length <= showCount ? 'visually-hidden' : ''}`} type="button" onClick={handleShowMoreReviewsButtonClick}>Показать больше отзывов
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>

        {isPopupAddCameraActive && <CatalogAddItemPopup camera={cameraById} onAddItemButtonClick={handleAddCameraButtonClick} onCloseModal={handleModalAddCameraClose} />}
        {isPopupAddCameraSuccessActive && <CatalogAddItemSuccessPopup onCloseModal={handleModalAddCameraSuccessClose} />}

      </main>
      <a className="up-btn" href="" onClick={scrollToTopEvent}>
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>
      <Footer />
    </div>
  );
}
