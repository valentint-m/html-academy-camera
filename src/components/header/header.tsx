import { Link } from 'react-router-dom';
import { Path } from '../../const';
import { useAppSelector } from '../../hooks';
import { getCamerasInCart } from '../../store/camera-data/camera-data-selectors';
import { getCamerasInCartCount } from '../../utils/utils';
import SearchForm from '../search-form/search-form';

export default function Header (): JSX.Element {
  const camerasInCart = useAppSelector(getCamerasInCart);
  const camerasCount = getCamerasInCartCount(camerasInCart);

  return (
    <header className="header" id="header">
      <div className="container">
        <Link className="header__logo" to={Path.Catalog} aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item"><Link className="main-nav__link" to={Path.Catalog}>Каталог</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="#">Гарантии</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="#">Доставка</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="#">О компании</Link>
            </li>
          </ul>
        </nav>

        <SearchForm />

        <Link className="header__basket-link" to={Path.Cart}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg><span className={camerasCount ? 'header__basket-count' : 'visually-hidden'}>{camerasCount}</span>
        </Link>

      </div>
    </header>
  );
}
