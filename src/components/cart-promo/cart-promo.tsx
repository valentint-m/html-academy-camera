import { useAppSelector } from '../../hooks';
import { getSubmittingStatus } from '../../store/camera-data/camera-data-selectors';

export default function CartPromo (): JSX.Element {
  const isSubmitting = useAppSelector(getSubmittingStatus);

  return (
    <div className="basket__promo">
      <p className="title title&#45;&#45;h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
      <div className="basket-form">
        <form action="#">
          <div className="custom-input">
            <label><span className="custom-input__label">Промокод</span>
              <input type="text" name="promo" placeholder="Введите промокод" disabled={isSubmitting} />
            </label>
            <p className="custom-input__error">Промокод неверный</p>
            <p className="custom-input__success">Промокод принят!</p>
          </div>
          <button className="btn" type="submit">Применить
          </button>
        </form>
      </div>
    </div>
  );
}
