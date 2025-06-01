import { useEffect } from 'react';
import { CameraInfo } from '../../types/camera';
import { ESCAPE_KEY } from '../../const';
import ReactFocusLock from 'react-focus-lock';
import useScrollLock from '../../hooks/use-scroll-lock/use-scroll-lock';

type CatalogAddItemPopupProps = {
  camera: CameraInfo;
  onCloseModal: () => void;
  onAddItemButtonClick: () => void;
}

export default function CatalogAddItemPopup({camera, onCloseModal, onAddItemButtonClick}: CatalogAddItemPopupProps): JSX.Element {
  useScrollLock();

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

  return (
    <ReactFocusLock>
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={onCloseModal}></div>
          <div className="modal__content">
            <p className="title title--h4">Добавить товар в корзину</p>
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
                <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{camera.price} ₽</p>
              </div>
            </div>
            <div className="modal__buttons">
              <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={onAddItemButtonClick}>
                <svg width="24" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-add-basket"></use>
                </svg>Добавить в корзину
              </button>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onCloseModal}>
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </ReactFocusLock>
  );
}
