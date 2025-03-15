import { useForm } from 'react-hook-form';
import { CameraInfo } from '../../types/camera';
import { FormEvent, useState } from 'react';
import useScrollLock from '../../hooks/use-scroll-lock';

type CatalogCallItemPopupProps = {
  camera: CameraInfo;
  onCloseButtonClick: () => void;
  onOverlayClick: () => void;
}

export default function CatalogCallItemPopup ({camera, onCloseButtonClick, onOverlayClick}: CatalogCallItemPopupProps): JSX.Element {
  useScrollLock();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isValidateChecked, setValidateChecked] = useState(false);

  function checkTel (tel: string) {
    const re = new RegExp(/(?:(\+7|8))\(?(\d{3})\)?(\d{3})[ -]?(\d{2})[ -]?(\d{2})$/, 'g');

    setValidateChecked(true);

    return tel.match(re) !== null || 'Некорректный ввод';
  }

  function isFormValid () {
    if (!isValidateChecked) {
      return '';
    }

    if (isValidateChecked && errors.userTel) {
      return 'is-invalid';
    }

    return 'is-valid';

  }

  function onSubmit (evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

  }

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onOverlayClick}></div>
        <div className="modal__content">
          <p className="title title--h4">Свяжитесь со мной</p>
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
          <form id="hook-form" onSubmit={handleSubmit(onSubmit)}>
            <div className={`custom-input ${!isValidateChecked ? 'default' : ''} ${isFormValid()}`}>
              <div className="custom-input form-review__item">
                <label>
                  <span className="custom-input__label">Телефон
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </span>

                  <input type="tel" {...register('userTel', {
                    required: 'Введите ваш номер',
                    validate: {checkTel}
                  })}
                  aria-invalid={errors.userTel ? 'true' : 'false'}
                  placeholder="Введите ваш номер" required
                  />

                </label>
                {errors.userTel && <p className="custom-input__error">{errors.userTel?.message?.toString()}</p>}
              </div>
            </div>
          </form>
          <br />
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--fit-width" form='hook-form' type="submit">
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Заказать
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onCloseButtonClick}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
