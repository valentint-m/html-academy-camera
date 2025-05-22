import { useAppDispatch } from '../../hooks';
import { cameraData } from '../../store/camera-data/camera-data';
import { CameraInCart, CameraInfo } from '../../types/camera';

type CartCardProps = {
  cameraInCart: CameraInCart;
  onRemoveItemButtonClick: (id: CameraInfo) => void;
}

export default function CartCard ({cameraInCart, onRemoveItemButtonClick}: CartCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  function handleIncreaseItemCountButtonClick () {
    dispatch(cameraData.actions.addCameraToCart(cameraInCart.camera));
  }

  function handleDecreaseItemCountButtonClick () {
    dispatch(cameraData.actions.decreaseCameraInCartCount(cameraInCart.camera.id));
  }

  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`${cameraInCart.camera.previewImgWebp}, ${cameraInCart.camera.previewImgWebp2x} 2x`} /><img src={cameraInCart.camera.previewImg} srcSet={`${cameraInCart.camera.previewImg2x} 2x`} width="140" height="120" alt={cameraInCart.camera.name} />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{cameraInCart.camera.name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{cameraInCart.camera.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{cameraInCart.camera.type}</li>
          <li className="basket-item__list-item">{cameraInCart.camera.level}</li>
        </ul>
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{cameraInCart.camera.price} ₽</p>
      <div className="quantity">
        <button className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара" disabled={cameraInCart.number === 1} onClick={handleDecreaseItemCountButtonClick} >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input type="number" id="counter1" value={cameraInCart.number} min="1" max="99" aria-label="количество товара" />
        <button className="btn-icon btn-icon--next" aria-label="увеличить количество товара" onClick={handleIncreaseItemCountButtonClick} >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>{cameraInCart.camera.price * cameraInCart.number} ₽</div>
      <button className="cross-btn" type="button" aria-label="Удалить товар" onClick={() => onRemoveItemButtonClick(cameraInCart.camera)} >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}
