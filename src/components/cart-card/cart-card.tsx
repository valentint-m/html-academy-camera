import { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { cameraData } from '../../store/camera-data/camera-data';
import { CameraInCart, CameraInfo } from '../../types/camera';
import { CameraCartCount } from '../../types/state';
import { CameraInCartCountBoundaryValue } from '../../const';

type CartCardProps = {
  cameraInCart: CameraInCart;
  onRemoveItemButtonClick: (id: CameraInfo) => void;
}

export default function CartCard ({cameraInCart, onRemoveItemButtonClick}: CartCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [cameraCount, setCameraCount] = useState<number>(cameraInCart.number);

  function handleIncreaseItemCountButtonClick () {
    setCameraCount(cameraCount + 1);
    dispatch(cameraData.actions.addCameraToCart(cameraInCart.camera));
  }

  function handleDecreaseItemCountButtonClick () {
    setCameraCount(cameraCount - 1);
    dispatch(cameraData.actions.decreaseCameraInCartCount(cameraInCart.camera.id));
  }

  function handleInputCountChange (evt: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(evt.target.value);
    const minValue = Number(evt.target.min);
    const maxValue = Number(evt.target.max);

    if (value < minValue) {
      setCameraCount(minValue);
    } else if (value > maxValue) {
      setCameraCount(maxValue);
    } else {
      setCameraCount(value);
    }
  }

  function handleInputCountBlur () {
    const cameraCountInfo: CameraCartCount = {
      id: cameraInCart.camera.id,
      number: cameraCount,
    };

    dispatch(cameraData.actions.setCameraInCartCount(cameraCountInfo));
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
        <button className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара" disabled={cameraInCart.number === CameraInCartCountBoundaryValue.Min} onClick={handleDecreaseItemCountButtonClick} >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input type="number" id="counter1" value={cameraCount} min={CameraInCartCountBoundaryValue.Min} max={CameraInCartCountBoundaryValue.Max} aria-label="количество товара" onChange={handleInputCountChange} onBlur={handleInputCountBlur}/>
        <button className="btn-icon btn-icon--next" aria-label="увеличить количество товара" disabled={cameraInCart.number === CameraInCartCountBoundaryValue.Max} onClick={handleIncreaseItemCountButtonClick} >
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
