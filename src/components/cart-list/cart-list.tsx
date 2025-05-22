import { CameraInCart, CameraInfo } from '../../types/camera';
import CartCard from '../cart-card/cart-card';

type CartListProps ={
  camerasInCart: CameraInCart[];
  onRemoveItemButtonClick: (camera: CameraInfo) => void;
}

export default function CartList ({camerasInCart, onRemoveItemButtonClick}: CartListProps): JSX.Element {
  return (
    <ul className="basket__list">
      {camerasInCart.map((cameraInCart) => <CartCard cameraInCart={cameraInCart} onRemoveItemButtonClick={onRemoveItemButtonClick} key={cameraInCart.camera.id} />)}
    </ul>
  );
}
