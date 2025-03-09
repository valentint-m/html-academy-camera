import { CameraInfo } from '../../types/camera';
import BasketItem from '../basket-item/basket-item';

type BasketListProps = {
  cameras: CameraInfo[];
}

export default function BasketList ({cameras}: BasketListProps): JSX.Element {
  return (
    <ul className="basket__list">
      {cameras.map((camera) => <BasketItem camera={camera} key={camera.id} />)}
    </ul>
  );
}
