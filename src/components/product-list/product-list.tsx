import { CameraInfo } from '../../types/camera';
import ProductCard from '../product-card/product-card';

type ProductListProps = {
  cameras: CameraInfo[];
  handleCallButtonClick(camera: CameraInfo): void;
}

export default function ProductList ({cameras, handleCallButtonClick}: ProductListProps): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {cameras.map((camera) => <ProductCard camera={camera} onCallButtonClick={handleCallButtonClick} key={camera.id} />)}
    </div>
  );
}
