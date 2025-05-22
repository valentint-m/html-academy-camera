import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCameras, getPromoCameras } from '../../store/camera-data/camera-data-selectors';
import { CameraInfo } from '../../types/camera';
import { Link } from 'react-router-dom';
import { filterCameras, filterCamerasByPrice, getArrayWithNewOrDeletedElement, getCameraPathById, getDocumentTitle, sortCamerasByTypeAndDirection } from '../../utils/utils';
import { DocumentTitle, FilterCameraCategory, FilterCameraLevel, FilterCameraType, Path, SortDirection, SortType } from '../../const';
import { cameraData } from '../../store/camera-data/camera-data';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ProductList from '../../components/product-list/product-list';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogAddItemPopup from '../../components/catalog-add-item-popup/catalog-add-item-popup';
import CatalogAddItemSuccessPopup from '../../components/catalog-add-item-success-popup/catalog-add-item-success-popup';


export default function CatalogScreen (): JSX.Element {
  const dispatch = useAppDispatch();

  const [selectedCamera, setCamera] = useState<CameraInfo | undefined>(undefined);
  const [isPopupAddCameraActive, setPopupAddCameraActive] = useState(false);
  const [isPopupAddCameraSuccessActive, setPopupAddCameraSuccessActive] = useState(false);

  const [sortType, setSortType] = useState<SortType>(SortType.Price);
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Up);

  const [wasFilterSelected, setFilterWasSelected] = useState<boolean>(false);

  const [filterCameraCategory, setFilterCameraCategory] = useState<FilterCameraCategory>(FilterCameraCategory.None);
  const [filterCameraTypes, setFilterCameraTypes] = useState<FilterCameraType[]>([]);
  const [filterCameraLevels, setFilterCameraLevels] = useState<FilterCameraLevel[]>([]);

  const [minPrice, setMinPrice] = useState<number | undefined>(0);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(0);

  const cameras = useAppSelector(getCameras);
  const sortedCameras = sortCamerasByTypeAndDirection(cameras, sortType, sortDirection);
  const filteredCameras = filterCameras(sortedCameras, filterCameraCategory, filterCameraTypes, filterCameraLevels);
  const filteredCamerasByPrice = filterCamerasByPrice(filteredCameras, minPrice, maxPrice);

  const promoCamera = useAppSelector(getPromoCameras)[0];

  useEffect(() => {
    document.title = getDocumentTitle(DocumentTitle.Catalog);
  }, []);

  useEffect(() => {
    const camerasByPrice = [...cameras].sort((cameraA, cameraB) => cameraA.price - cameraB.price);
    setMinPrice(camerasByPrice[0]?.price);
    setMaxPrice(camerasByPrice.at(-1)?.price);
  }, [cameras]);

  useEffect(() => {
    if (wasFilterSelected) {
      const camerasByPrice = [...filteredCameras].sort((cameraA, cameraB) => cameraA.price - cameraB.price);
      setMinPrice(camerasByPrice[0]?.price);
      setMaxPrice(camerasByPrice.at(-1)?.price);
      setFilterWasSelected(false);
    }
  }, [filteredCameras, wasFilterSelected]);

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

  function handleFilterCategoryChange (evt: ChangeEvent<HTMLInputElement>) {
    const name = evt.target.name;

    const filterCategoryNames = Array.from(Object.values(FilterCameraCategory));

    if (name === 'category') {
      const value = evt.target.value;
      const selectedFilterCameraCategory = filterCategoryNames.find((category) => category === value);

      if (selectedFilterCameraCategory) {
        setFilterCameraCategory(selectedFilterCameraCategory);
      }

      if (selectedFilterCameraCategory === FilterCameraCategory.VideoCamera && filterCameraTypes.includes(FilterCameraType.Film) || filterCameraTypes.includes(FilterCameraType.Snapshot)) {
        setFilterCameraTypes([]);
      }
    }

    setFilterWasSelected(true);
  }

  function handleFilterTypeChange (evt: ChangeEvent<HTMLInputElement>) {
    const name = evt.target.name;

    const filterTypeNames = Object.values(FilterCameraType);

    const selectedFilterCameraType = filterTypeNames.find((type) => type === name);

    if (selectedFilterCameraType) {
      const filterCameraTypesCopy = getArrayWithNewOrDeletedElement<FilterCameraType>(filterCameraTypes, selectedFilterCameraType);

      setFilterCameraTypes(filterCameraTypesCopy);
    }

    setFilterWasSelected(true);
  }

  function handleFilterLevelChange (evt: ChangeEvent<HTMLInputElement>) {
    const name = evt.target.name;

    const filterLevelNames = Object.values(FilterCameraLevel);

    const selectedFilterCameraLevel = filterLevelNames.find((level) => level === name);

    if (selectedFilterCameraLevel) {
      const filterCameraLevelsCopy = getArrayWithNewOrDeletedElement<FilterCameraLevel>(filterCameraLevels, selectedFilterCameraLevel);

      setFilterCameraLevels(filterCameraLevelsCopy);
    }

    setFilterWasSelected(true);
  }

  function handleFilterMinPriceBlur (evt: React.FocusEvent<HTMLInputElement>) {
    const value = Number(evt.target.value);
    const cameraPrices: number[] = [];
    filteredCameras.forEach((camera) => cameraPrices.push(camera.price));

    const minCameraPrice = Math.min(...cameraPrices);
    if (value < minCameraPrice) {
      setMinPrice(minCameraPrice);
    } else if (maxPrice && value > maxPrice) {
      setMinPrice(maxPrice);
    } else {
      setMinPrice(value);
    }
  }

  function handleFilterMaxPriceBlur (evt: React.FocusEvent<HTMLInputElement>) {
    const value = Number(evt.target.value);
    const cameraPrices: number[] = [];
    filteredCameras.forEach((camera) => cameraPrices.push(camera.price));

    const maxCameraPrice = Math.max(...cameraPrices);
    if (value > maxCameraPrice) {
      setMaxPrice(maxCameraPrice);
    } else if (minPrice && value < minPrice) {
      setMaxPrice(minPrice);
    } else {
      setMaxPrice(value);
    }
  }

  function handleFilterResetButtonClick () {
    setFilterCameraCategory(FilterCameraCategory.None);
    setFilterCameraTypes([]);
    setFilterCameraLevels([]);
  }

  function handleBuyButtonClick (camera: CameraInfo) {
    setPopupAddCameraActive(true);
    setCamera(camera);
  }

  function handleModalAddCameraClose () {
    setPopupAddCameraActive(false);
  }

  function handleAddCameraButtonClick () {
    handleModalAddCameraClose();
    setPopupAddCameraSuccessActive(true);
    dispatch(cameraData.actions.addCameraToCart(selectedCamera));
  }

  function handleModalAddCameraSuccessClose () {
    setPopupAddCameraSuccessActive(false);
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
                  <Link className="breadcrumbs__link" to={Path.Catalog}>Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
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

                  <CatalogFilter category={filterCameraCategory} types={filterCameraTypes} levels={filterCameraLevels} minPrice={minPrice} maxPrice={maxPrice} onCategoryChange={handleFilterCategoryChange} onTypeChange={handleFilterTypeChange} onLevelChange={handleFilterLevelChange} onMinPriceBlur={handleFilterMinPriceBlur} onMaxPriceBlur={handleFilterMaxPriceBlur} onResetButtonClick={handleFilterResetButtonClick}/>

                </div>
                <div className="catalog__content">

                  <CatalogSort sortType={sortType} sortDirection={sortDirection} onInputChange={handleSortInputChange}/>
                  <ProductList cameras={filteredCamerasByPrice} onBuyButtonClick={handleBuyButtonClick} />

                </div>
              </div>
            </div>
          </section>
        </div>
        {isPopupAddCameraActive && selectedCamera && <CatalogAddItemPopup camera={selectedCamera} onAddItemButtonClick={handleAddCameraButtonClick} onCloseModal={handleModalAddCameraClose} />}
        {isPopupAddCameraSuccessActive && <CatalogAddItemSuccessPopup onCloseModal={handleModalAddCameraSuccessClose} />}
      </main>
      <Footer />
    </div>
  );
}
