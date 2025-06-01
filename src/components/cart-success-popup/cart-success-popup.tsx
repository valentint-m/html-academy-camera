import { useEffect } from 'react';
import { ESCAPE_KEY, Path } from '../../const';
import useScrollLock from '../../hooks/use-scroll-lock/use-scroll-lock';
import { Link } from 'react-router-dom';

type CartSuccessPopupProps = {
  onCloseModal: () => void;
}

export default function CartSuccessPopup ({onCloseModal}: CartSuccessPopupProps): JSX.Element {
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
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onCloseModal} ></div>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за покупку</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <Link className="btn btn--purple modal__btn modal__btn--fit-width" type="button" to={Path.Catalog} >Вернуться к покупкам
            </Link>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onCloseModal} >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
