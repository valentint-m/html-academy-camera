import { ChangeEvent } from 'react';
import { SortDirection, SortType } from '../../const';

type CatalogSortProps = {
  sortType: SortType;
  sortDirection: SortDirection;
  onInputChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}

export default function CatalogSort ({sortType, sortDirection, onInputChange}: CatalogSortProps): JSX.Element {
  return (
    <div className="catalog-sort">
      <form action="#" >
        <div className="catalog-sort__inner">
          <p className="title title&#45;&#45;h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input type="radio" id="sortPrice" name="sort" checked={sortType === SortType.Price} onChange={onInputChange}/>
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input type="radio" id="sortPopular" name="sort" checked={sortType === SortType.ReviewCount} onChange={onInputChange}/>
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn&#45;&#45;up">
              <input type="radio" id="up" name="sort-icon" aria-label="По возрастанию" checked={sortDirection === SortDirection.Up} onChange={onInputChange}/>
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn&#45;&#45;down">
              <input type="radio" id="down" name="sort-icon" aria-label="По убыванию" checked={sortDirection === SortDirection.Down} onChange={onInputChange}/>
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
