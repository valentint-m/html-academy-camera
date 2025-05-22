import { useEffect } from 'react';
import useScrollLock from '../../hooks/use-scroll-lock/use-scroll-lock';
import { CameraInfo } from '../../types/camera';
import { ESCAPE_KEY, Path } from '../../const';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { cameraData } from '../../store/camera-data/camera-data';

type CartRemoveItemPopupProps = {
  camera: CameraInfo;
  onCloseModal: () => void;
}

export default function CartRemoveItemPopup ({camera, onCloseModal}: CartRemoveItemPopupProps): JSX.Element {
  useScrollLock();

  const dispatch = useAppDispatch();

  useEffect(() => {
    function onKeyPressed (evt: KeyboardEvent) {
      if (evt.key === ESCAPE_KEY) {
        onCloseModal();
      }
    }
    window.addEventListener('keydown', onKeyPressed);
    return () => window.removeEventListener('keydown', onKeyPressed);
  }, [onCloseModal]
  );

  function handleRemoveItemButtonClick () {
    dispatch(cameraData.actions.removeCameraFromCart(camera.id));
    onCloseModal();
  }

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onCloseModal}></div>
        <div className="modal__content">
          <p className="title title--h4">Удалить этот товар?</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x} 2x`} /><img src={camera.previewImg} srcSet={`${camera.previewImg2x} 2x`} width="140" height="120" alt={camera.name} />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{camera.name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{camera.vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{camera.type}</li>
                <li className="basket-item__list-item">{camera.level}</li>
              </ul>
            </div>
          </div>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--half-width" type="button" onClick={handleRemoveItemButtonClick}>Удалить
            </button>
            <Link className="btn btn--transparent modal__btn modal__btn--half-width" to={Path.Cart} onClick={onCloseModal}>Продолжить покупки
            </Link>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onCloseModal}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
