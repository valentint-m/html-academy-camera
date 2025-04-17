import { ApiRoute, CameraCategoryRussian, CameraLevelRussian, CameraTypeRussian, DEFAULT_DOCUMENT_TITLE, FilterCameraCategory, FilterCameraLevel, FilterCameraType, PRODUCT_PATH, SortDirection, SortType } from '../const';
import { CameraInfo, ReviewInfo } from '../types/camera';

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


export { getCameraUrlById, getSimilarCamerasUrlById, getCameraReviewsUrlById, getCameraPathById, getFormattedDate, getDocumentTitle, sortReviewsByLatest, sortCamerasByTypeAndDirection, getArrayWithNewOrDeletedElement, filterCameras };
