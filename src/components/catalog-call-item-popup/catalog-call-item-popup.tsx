import { useForm } from 'react-hook-form';
import { CameraInfo, OrderInfo } from '../../types/camera';
import { useEffect, useState } from 'react';
import { ESCAPE_KEY, PHONE_NUMBER_WITH_PLUS_LENGTH, PhoneNumberCode } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { orderCameraAction } from '../../store/api-actions/api-actions';
import { getSubmittingStatus } from '../../store/camera-data/camera-data-selectors';
import useScrollLock from '../../hooks/use-scroll-lock';
import ReactFocusLock from 'react-focus-lock';

type CatalogCallItemPopupProps = {
  camera: CameraInfo;
  onCloseModal: () => void;
}

type ModalFormData = {
  userTel: string;
}

export default function CatalogCallItemPopup ({camera, onCloseModal}: CatalogCallItemPopupProps): JSX.Element {
  useScrollLock();

  const { register, handleSubmit, formState: { errors } } = useForm<ModalFormData>();
  const [isValidateChecked, setValidateChecked] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [isOrderError, setOrderError] = useState(false);

  const dispatch = useAppDispatch();
  const isSubmitting = useAppSelector(getSubmittingStatus);

  useEffect(() => {
    if (isSubmitting) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [isSubmitting]);

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

  function checkTel (tel: string) {
    const re = new RegExp(/(?:(\+7|8))\(?(\d{3})\)?(\d{3})[ -]?(\d{2})[ -]?(\d{2})$/, 'g');

    setValidateChecked(true);

    return tel.match(re) !== null || 'Некорректный ввод';
  }

  function isFormValid () {
    if (!isValidateChecked) {
      return '';
    }
    return isValidateChecked && errors.userTel ? 'is-invalid' : 'is-valid';
  }

  async function onSubmit (data: ModalFormData) {
    let formattedUserTel = data.userTel;

    if (formattedUserTel.length !== PHONE_NUMBER_WITH_PLUS_LENGTH) {
      formattedUserTel = formattedUserTel.replace(PhoneNumberCode.NoPlusCode, PhoneNumberCode.PlusCode);
    }

    const orderInfo: OrderInfo = {
      camerasIds: [camera.id],
      coupon: null,
      tel: formattedUserTel,
    };

    try {
      await dispatch(orderCameraAction(orderInfo)).unwrap();
      onCloseModal();
    } catch (error) {
      setOrderError(true);
    }

  }

  return (
    <ReactFocusLock>
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={onCloseModal}></div>
          <div className="modal__content">
            <p className="title title--h4">Свяжитесь со мной</p>
            { isOrderError && <p>Ошибка!</p> }
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
            <form id="hook-form" onSubmit={(evt) => {
              void handleSubmit(onSubmit)(evt);
            }}
            >
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
                    placeholder="Введите ваш номер" required autoFocus
                    />

                  </label>
                  {errors.userTel && <p className="custom-input__error">{errors.userTel?.message?.toString()}</p>}
                </div>
              </div>
            </form>
            <br />
            <div className="modal__buttons">
              <button className="btn btn--purple modal__btn modal__btn--fit-width" form='hook-form' type="submit" disabled={isButtonDisabled}>
                <svg width="24" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-add-basket"></use>
                </svg>Заказать
              </button>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onCloseModal} disabled={isButtonDisabled}>
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
