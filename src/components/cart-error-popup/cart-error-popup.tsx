import { useEffect } from 'react';
import { ESCAPE_KEY } from '../../const';
import useScrollLock from '../../hooks/use-scroll-lock/use-scroll-lock';

type CartErrorPopupProps = {
  onCloseModal: () => void;
}

export default function CartErrorPopup ({onCloseModal}: CartErrorPopupProps): JSX.Element {
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
          <p className="title title--h4">Ошибка при отправке запроса.</p>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={onCloseModal} >Вернуться к покупкам
            </button>
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
