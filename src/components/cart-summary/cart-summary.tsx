import { CameraInCart } from '../../types/camera';
import { getBonusValue, getCamerasInCartCount, getSummaryValue, getSummaryWithDiscountValue } from '../../utils/utils';
import CartPromo from '../cart-promo/cart-promo';

type CartSummaryProps = {
  camerasInCart: CameraInCart[];
}

export default function CartSummary ({camerasInCart}: CartSummaryProps): JSX.Element {
  const camerasInCartCount = getCamerasInCartCount(camerasInCart);
  const summaryValue = getSummaryValue(camerasInCart);
  const bonusValue = getBonusValue(summaryValue, camerasInCartCount);
  const summaryWithDiscountValue = getSummaryWithDiscountValue(summaryValue, bonusValue);

  return (
    <div className="basket__summary">
      <CartPromo />
      <div className="basket__summary-order">
        <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">{summaryValue} ₽</span></p>
        <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className="basket__summary-value basket__summary-value--bonus">{bonusValue} ₽</span></p>
        <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">{summaryWithDiscountValue} ₽</span></p>
        <button className="btn btn--purple" type="submit">Оформить заказ
        </button>
      </div>
    </div>
  );
}
