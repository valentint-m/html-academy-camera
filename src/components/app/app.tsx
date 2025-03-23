import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Path } from '../../const';
import { useAppSelector } from '../../hooks';
import { getCamerasDataLoadingStatus, getErrorStatus } from '../../store/camera-data/camera-data-selectors';
import ErrorRouteScreen from '../../pages/error-route-screen/error-route-screen';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import ErrorServerScreen from '../../pages/error-server-screen/error-server-screen';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import ProductScreen from '../../pages/product-screen/product-screen';

function App (): JSX.Element {
  const isCamerasDataLoading = useAppSelector(getCamerasDataLoadingStatus);
  const hasError = useAppSelector(getErrorStatus);

  if (isCamerasDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  if (hasError) {
    return (
      <ErrorServerScreen />);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={Path.Main} element={<CatalogScreen />} />
        <Route path={Path.Catalog} element={<CatalogScreen />} />
        <Route path={Path.Product} element={<ProductScreen />} />
        <Route path={Path.Basket} element={<CatalogScreen />} />
        <Route path='*' element={<ErrorRouteScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
