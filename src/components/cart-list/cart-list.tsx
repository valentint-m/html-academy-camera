import { CameraInCart } from '../../types/camera';
import CartCard from '../cart-card/cart-card';

type CartListProps ={
  camerasInCart: CameraInCart[];
}

export default function CartList ({camerasInCart}: CartListProps): JSX.Element {
  return (
    <ul className="basket__list">
      {camerasInCart.map((cameraInCart) => <CartCard cameraInCart={cameraInCart} key={cameraInCart.camera.id} />)}
    </ul>
  );
}
