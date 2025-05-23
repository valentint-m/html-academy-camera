import { useEffect } from 'react';
import { ESCAPE_KEY, Path } from '../../const';
import useScrollLock from '../../hooks/use-scroll-lock/use-scroll-lock';
import ReactFocusLock from 'react-focus-lock';
import { Link } from 'react-router-dom';

type CatalogAddItemSuccessPopupProps = {
  onCloseModal: () => void;
}

export default function CatalogAddItemSuccessPopup ({onCloseModal}: CatalogAddItemSuccessPopupProps): JSX.Element {
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
      <div className="modal is-active modal--narrow">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={onCloseModal}></div>
          <div className="modal__content">
            <p className="title title--h4">Товар успешно добавлен в корзину</p>
            <svg className="modal__icon" width="86" height="80" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <div className="modal__buttons">
              <button className="btn btn--transparent modal__btn" onClick={onCloseModal}>Продолжить покупки</button>
              <Link className="btn btn--purple modal__btn modal__btn--fit-width" to={Path.Cart}>Перейти в корзину</Link>
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
