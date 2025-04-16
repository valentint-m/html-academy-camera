import { ChangeEvent, useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getCameras, getPromoCameras, getSubmittingStatus } from '../../store/camera-data/camera-data-selectors';
import { CameraInfo } from '../../types/camera';
import { Link } from 'react-router-dom';
import { getCameraPathById, getDocumentTitle, sortCamerasByTypeAndDirection } from '../../utils/utils';
import { DocumentTitle, FilterCameraCategory, FilterCameraLevel, FilterCameraType, SortDirection, SortType } from '../../const';
import CatalogCallItemPopup from '../../components/catalog-call-item-popup/catalog-call-item-popup';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ProductList from '../../components/product-list/product-list';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';


export default function CatalogScreen (): JSX.Element {
  const [selectedCamera, setCamera] = useState<CameraInfo | undefined>(undefined);
  const [isPopupActive, setPopupActive] = useState(false);

  const [sortType, setSortType] = useState<SortType>(SortType.Price);
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Up);

  const [filterCameraCategory, setFilterCameraCategory] = useState<FilterCameraCategory>(FilterCameraCategory.None);
  const [filterCameraType, setFilterCameraType] = useState<FilterCameraType>(FilterCameraType.None);
  const [filterCameraLevel, setFilterCameraLevel] = useState<FilterCameraLevel>(FilterCameraLevel.None);

  const cameras = sortCamerasByTypeAndDirection(useAppSelector(getCameras), sortType, sortDirection);
  const promoCamera = useAppSelector(getPromoCameras)[0];
  const isSubmitting = useAppSelector(getSubmittingStatus);

  useEffect(() => {
    document.title = getDocumentTitle(DocumentTitle.Catalog);
  }, []);

  function getPromoCameraInfo (promoId: number): CameraInfo | undefined {
    return cameras.find((camera) => camera.id === promoId);
  }

  function handleSortInputChange (evt: ChangeEvent<HTMLInputElement>) {
    const id = evt.target.id;

    switch (id) {
      case 'down':
        setSortDirection(SortDirection.Down);
        break;
      case 'up':
        setSortDirection(SortDirection.Up);
        break;
      case 'sortPopular':
        setSortType(SortType.ReviewCount);
        break;
      case 'sortPrice':
        setSortType(SortType.Price);
        break;
      default:
        break;
    }
  }

  function handleFilterInputChange (evt: ChangeEvent<HTMLInputElement>) {
    const name = evt.target.name;

    const filterCategoryNames = Array.from(Object.values(FilterCameraCategory));

    if (name === 'category') {
      const value = evt.target.value;
      const selectedFilterCameraCategory = filterCategoryNames.find((category) => category === value);

      if (selectedFilterCameraCategory) {
        setFilterCameraCategory(selectedFilterCameraCategory);
      }

      if (selectedFilterCameraCategory === FilterCameraCategory.VideoCamera && filterCameraType === FilterCameraType.Film || filterCameraType === FilterCameraType.Snapshot) {
        setFilterCameraType(FilterCameraType.None);
      }

      return;
    }

    const filterTypeNames = Object.values(FilterCameraType);
    const filterLevelNames = Object.values(FilterCameraLevel);

    const selectedFilterCameraType = filterTypeNames.find((type) => type === name);
    const selectedFilterCameraLevel = filterLevelNames.find((level) => level === name);

    if (selectedFilterCameraType) {
      setFilterCameraType(selectedFilterCameraType);

      return;
    }

    if (selectedFilterCameraLevel) {
      setFilterCameraLevel(selectedFilterCameraLevel);
    }

  }

  function handleFilterResetButtonClick () {
    setFilterCameraCategory(FilterCameraCategory.None);
    setFilterCameraType(FilterCameraType.None);
    setFilterCameraLevel(FilterCameraLevel.None);
  }

  function handleCallButtonClick (camera: CameraInfo) {
    setPopupActive(true);
    setCamera(camera);
  }

  function handleModalClose () {
    if (!isSubmitting) {
      setPopupActive(false);
    }
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
                <div className="catalog__aside">

                  <CatalogFilter category={filterCameraCategory} type={filterCameraType} level={filterCameraLevel} onInputChange={handleFilterInputChange} onResetButtonClick={handleFilterResetButtonClick}/>

                </div>
                <div className="catalog__content">

                  <CatalogSort sortType={sortType} sortDirection={sortDirection} onInputChange={handleSortInputChange}/>
                  <ProductList cameras={cameras} handleCallButtonClick={handleCallButtonClick} />

                </div>
              </div>
            </div>
          </section>
        </div>
        {isPopupActive && selectedCamera && <CatalogCallItemPopup camera={selectedCamera} onCloseModal={handleModalClose} />}
      </main>
      <Footer />
    </div>
  );
}
