import { ApiRoute, CameraCategoryRussian, CameraCountDiscountValue, CameraLevelRussian, CameraSummaryPriceDiscountValue, CameraTypeRussian, CameraUpperCountForDiscount, CameraUpperSummaryPriceForDiscount, DEFAULT_DOCUMENT_TITLE, FilterCameraCategory, FilterCameraLevel, FilterCameraType, PRODUCT_PATH, SCROLL_UP_COORD, SortDirection, SortType } from '../const';
import { CameraInCart, CameraInfo, PromoInfo, ReviewInfo } from '../types/camera';

function getCameraUrlById (id: number) {
  return `${ApiRoute.Cameras}${id}`;
}

function getSimilarCamerasUrlById (id: number) {
  return `${ApiRoute.Cameras}${id}${ApiRoute.SimilarCameras}`;
}

function getCameraReviewsUrlById (id: number) {
  return `${ApiRoute.Cameras}${id}${ApiRoute.Reviews}`;
}

function getCameraPathById (id: number) {
  return `${PRODUCT_PATH}${id}`;
}

function getFormattedDate (dateString: string) {
  const date = new Date(dateString);

  const formatter = new Intl.DateTimeFormat('ru', {
    day: '2-digit',
    month: 'long',
  });

  const formattedDate = formatter.format(date);

  return formattedDate;
}

function getDocumentTitle (pageName: string) {
  return `${pageName} - ${DEFAULT_DOCUMENT_TITLE}`;
}

function sortReviewsByLatest (reviews: ReviewInfo[]) {
  const reviewsCopy = Array.from(reviews);

  const sortedReviews = reviewsCopy.sort((reviewsA, reviewsB) => {
    const newDateA = new Date(reviewsA.createAt);
    const newDateB = new Date(reviewsB.createAt);
    return newDateB > newDateA ? 1 : -1;
  });
  return sortedReviews;
}

function sortCamerasByTypeAndDirection (cameras: CameraInfo[], type: SortType, direction: SortDirection) {
  const camerasCopy = Array.from(cameras);

  switch (direction) {
    case SortDirection.Up:
      camerasCopy.sort((cameraA, cameraB) => cameraA[type] - cameraB[type]);
      break;
    case SortDirection.Down:
      camerasCopy.sort((cameraA, cameraB) => cameraB[type] - cameraA[type]);
      break;
    default:
      break;
  }

  return camerasCopy;
}

function getTranslatedCameraCategoryName (category: string) {
  switch (category){
    case CameraCategoryRussian.PhotoCamera:
      return FilterCameraCategory.PhotoCamera;
    case CameraCategoryRussian.VideoCamera:
      return FilterCameraCategory.VideoCamera;
  }
}

function getTranslatedCameraTypeName (type: string) {
  switch (type){
    case CameraTypeRussian.Collection:
      return FilterCameraType.Collection;
    case CameraTypeRussian.Film:
      return FilterCameraType.Film;
    case CameraTypeRussian.Digital:
      return FilterCameraType.Digital;
    case CameraTypeRussian.Snapshot:
      return FilterCameraType.Snapshot;
  }
}

function getTranslatedCameraLevelName (level: string) {
  switch (level){
    case CameraLevelRussian.Zero:
      return FilterCameraLevel.Zero;
    case CameraLevelRussian.NonProfessional:
      return FilterCameraLevel.NonProfessional;
    case CameraLevelRussian.Professional:
      return FilterCameraLevel.Professional;
  }
}

function filterCameras (cameras: CameraInfo[], filterCategory: FilterCameraCategory, filterType: FilterCameraType[], filterLevel: FilterCameraLevel[]) {
  const camerasCopy = Array.from(cameras);

  const camerasFilteredByCategory = camerasCopy.filter((camera) => {
    if (filterCategory === FilterCameraCategory.None) {
      return true;
    }
    const cameraTranslatedCategory = getTranslatedCameraCategoryName(camera.category);
    if (cameraTranslatedCategory) {
      return cameraTranslatedCategory === filterCategory;
    }
  });
  const camerasFilteredByCategoryAndType = camerasFilteredByCategory.filter((camera) => {
    if (filterType.length === 0) {
      return true;
    }
    const cameraTranslatedType = getTranslatedCameraTypeName(camera.type);
    if (cameraTranslatedType) {
      return filterType.includes(cameraTranslatedType);
    }
  });
  const camerasFilteredByCategoryAndTypeAndLevel = camerasFilteredByCategoryAndType.filter((camera) => {
    if (filterLevel.length === 0) {
      return true;
    }
    const cameraTranslatedLevel = getTranslatedCameraLevelName(camera.level);
    if (cameraTranslatedLevel) {
      return filterLevel.includes(cameraTranslatedLevel);
    }
  });

  return camerasFilteredByCategoryAndTypeAndLevel;
}

function filterCamerasByPrice (cameras: CameraInfo[], minPrice: number | undefined, maxPrice: number | undefined) {
  const camerasCopy = Array.from(cameras);

  if (minPrice && maxPrice) {
    const camerasFilteredByPrice = camerasCopy.filter((camera) => camera.price >= minPrice && camera.price <= maxPrice);
    return camerasFilteredByPrice;
  }

  return camerasCopy;
}

function getArrayWithNewOrDeletedElement<TypeElement>(array: TypeElement[], element: TypeElement): TypeElement[] {
  const arrayCopy = [...array];

  if (arrayCopy.includes(element)) {
    const elementIndex = arrayCopy.findIndex((value) => value === element);
    arrayCopy.splice(elementIndex, 1);

  } else {
    arrayCopy.push(element);
  }

  return arrayCopy;
}

function getCamerasInCartWithoutPromo(camerasInCart: CameraInCart[], promoCameras: PromoInfo[]) {
  const camerasInCartIds = camerasInCart.map((camera) => camera.camera.id);
  const promoCamerasIds = promoCameras.map((promoCamera) => promoCamera.id);
  const camerasInCartWithoutPromoIds = camerasInCartIds.filter((id) => promoCamerasIds.indexOf(id) < 0);

  const camerasInCartWithoutPromo: CameraInCart[] = camerasInCart.filter((camera) => camerasInCartWithoutPromoIds.includes(camera.camera.id));

  return camerasInCartWithoutPromo;
}

function getCamerasSearchCount (cameras: CameraInfo[], searchText: string) {
  const cameraNames = cameras.map((camera) => camera.name.toLowerCase());
  let cameraCount = 0;
  for (let i = 0; i < cameraNames.length; i++) {
    if (cameraNames[i].toLowerCase().includes(searchText.toLowerCase())) {
      cameraCount += 1;
    }
  }
  return cameraCount;
}

function getCamerasInCartCount (camerasInCart: CameraInCart[]) {
  let camerasInCartCount = 0;
  camerasInCart.forEach((cameraInCart) => {
    camerasInCartCount += cameraInCart.number;
  });

  return camerasInCartCount;
}

function getSummaryValue (camerasInCart: CameraInCart[]) {
  let summaryValue = 0;

  camerasInCart.forEach((cameraInCart) => {
    summaryValue += cameraInCart.number * cameraInCart.camera.price;
  });

  return summaryValue;
}

function getBonusValue (summaryValue: number, camerasInCartCount: number) {
  let bonusPercent = 0;

  if (camerasInCartCount < CameraUpperCountForDiscount.Low) {
    return bonusPercent;
  } else if (camerasInCartCount === CameraUpperCountForDiscount.Low) {
    bonusPercent = CameraCountDiscountValue.Low;
  } else if (camerasInCartCount <= CameraUpperCountForDiscount.Medium) {
    bonusPercent = CameraCountDiscountValue.Medium;
  } else if (camerasInCartCount <= CameraUpperCountForDiscount.High) {
    bonusPercent = CameraCountDiscountValue.High;
  } else if (camerasInCartCount > CameraUpperCountForDiscount.High) {
    bonusPercent = CameraCountDiscountValue.Highest;
  }

  if (summaryValue < CameraUpperSummaryPriceForDiscount.Low) {
    return Math.round(summaryValue * 0.01 * bonusPercent);
  } else if (summaryValue <= CameraUpperSummaryPriceForDiscount.Medium) {
    bonusPercent -= CameraSummaryPriceDiscountValue.Low;
  } else if (summaryValue <= CameraUpperSummaryPriceForDiscount.High) {
    bonusPercent -= CameraSummaryPriceDiscountValue.Medium;
  } else if (summaryValue > CameraUpperSummaryPriceForDiscount.High) {
    bonusPercent -= CameraSummaryPriceDiscountValue.High;
  }

  return Math.round(summaryValue * 0.01 * bonusPercent);
}

function getSummaryWithDiscountValue (summaryValue: number, bonusValue: number) {
  return summaryValue - bonusValue;
}

function checkIfCameraIsInCart (camera: CameraInfo, camerasInCart: CameraInCart[]) {
  for (let i = 0; i < camerasInCart.length; i++) {
    if (camerasInCart[i].camera.id === camera.id) {
      return true;
    }
  }
  return false;
}

function scrollToTopEvent (evt: React.MouseEvent<HTMLAnchorElement>) {
  evt.preventDefault();
  window.scrollTo({
    top: SCROLL_UP_COORD,
    behavior: 'smooth'
  });
}

function scrollToTop () {
  window.scrollTo({
    top: SCROLL_UP_COORD,
    behavior: 'instant'
  });
}


export { getCameraUrlById, getSimilarCamerasUrlById, getCameraReviewsUrlById, getCameraPathById, getFormattedDate, getDocumentTitle, sortReviewsByLatest, sortCamerasByTypeAndDirection, getArrayWithNewOrDeletedElement, filterCameras, filterCamerasByPrice, getCamerasSearchCount, getSummaryValue, getBonusValue, getSummaryWithDiscountValue, getCamerasInCartCount, getCamerasInCartWithoutPromo, checkIfCameraIsInCart, scrollToTop, scrollToTopEvent };
