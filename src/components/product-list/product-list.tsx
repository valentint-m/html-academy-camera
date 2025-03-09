import { CameraInfo } from '../../types/camera';
import ProductCard from '../product-card/product-card';

type ProductListProps = {
  cameras: CameraInfo[];
}

export default function ProductList ({cameras}: ProductListProps): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {cameras.map((camera) => <ProductCard camera={camera} key={camera.id} />)}
    </div>
  );
}
