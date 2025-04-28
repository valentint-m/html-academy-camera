import { Link } from 'react-router-dom';
import { Path } from '../../const';
import SearchForm from '../search-form/search-form';

export default function Header (): JSX.Element {
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

      </div>
    </header>
  );
}
