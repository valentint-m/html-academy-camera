import CartCard from '../cart-card/cart-card';

export default function CartList (): JSX.Element {
  return (
    <ul className="basket__list">
      <CartCard />
    </ul>
  );
}
