import { useAppDispatch, useAppSelector } from '../../hooks';
import { orderCameraAction } from '../../store/api-actions/api-actions';
import { getPromoCameras, getSubmittingStatus } from '../../store/camera-data/camera-data-selectors';
import { CameraInCart, OrderInfo } from '../../types/camera';
import { getBonusValue, getCamerasInCartCount, getCamerasInCartWithoutPromo, getSummaryValue, getSummaryWithDiscountValue } from '../../utils/utils';
import CartPromo from '../cart-promo/cart-promo';

type CartSummaryProps = {
  camerasInCart: CameraInCart[];
}

export default function CartSummary ({camerasInCart}: CartSummaryProps): JSX.Element {
  const dispatch = useAppDispatch();

  const isSubmitting = useAppSelector(getSubmittingStatus);
  const promoCameras = useAppSelector(getPromoCameras);

  const camerasInCartWithoutPromo = getCamerasInCartWithoutPromo(camerasInCart, promoCameras);

  const camerasInCartCount = getCamerasInCartCount(camerasInCart);
  const camerasInCartWithoutPromoCount = getCamerasInCartCount(camerasInCartWithoutPromo);
  const summaryValue = getSummaryValue(camerasInCart);
  const summaryValueWithoutPromo = getSummaryValue(camerasInCartWithoutPromo);
  const bonusValue = getBonusValue(summaryValueWithoutPromo, camerasInCartWithoutPromoCount);
  const summaryWithDiscountValue = getSummaryWithDiscountValue(summaryValue, bonusValue);

  function handleOrderCamerasButtonClick () {
    const cameraIds: number[] = [];

    camerasInCart.forEach((cameraInCart) => cameraIds.push(cameraInCart.camera.id));

    const orderInfo: OrderInfo = {
      camerasIds: cameraIds,
      coupon: null,
      tel: '',
    };

    dispatch(orderCameraAction(orderInfo));
  }

  return (
    <div className="basket__summary">
      <CartPromo />
      <div className="basket__summary-order">
        <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">{summaryValue} ₽</span></p>
        <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className={`basket__summary-value ${bonusValue > 0 ? 'basket__summary-value--bonus' : ''}`}>{bonusValue} ₽</span></p>
        <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">{summaryWithDiscountValue} ₽</span></p>
        <button className="btn btn--purple" type="submit" onClick={handleOrderCamerasButtonClick} disabled={!camerasInCartCount || isSubmitting} >Оформить заказ
        </button>
      </div>
    </div>
  );
}
