import { CameraInfo } from '../../types/camera';
import ProductCard from '../product-card/product-card';

type ProductListProps = {
  cameras: CameraInfo[];
  onBuyButtonClick(camera: CameraInfo): void;
}

export default function ProductList ({cameras, onBuyButtonClick}: ProductListProps): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {cameras.map((camera) => <ProductCard camera={camera} onBuyButtonClick={onBuyButtonClick} key={camera.id} />)}
    </div>
  );
}
