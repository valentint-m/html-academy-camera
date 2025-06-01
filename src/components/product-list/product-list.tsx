import { CameraInCart, CameraInfo } from '../../types/camera';
import { checkIfCameraIsInCart } from '../../utils/utils';
import ProductCard from '../product-card/product-card';

type ProductListProps = {
  cameras: CameraInfo[];
  camerasInCart: CameraInCart[];
  onBuyButtonClick(camera: CameraInfo): void;
}

export default function ProductList ({cameras, camerasInCart, onBuyButtonClick}: ProductListProps): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {cameras.map((camera) => <ProductCard camera={camera} isCameraInCart={checkIfCameraIsInCart(camera, camerasInCart)} onBuyButtonClick={onBuyButtonClick} key={camera.id} />)}
    </div>
  );
}
