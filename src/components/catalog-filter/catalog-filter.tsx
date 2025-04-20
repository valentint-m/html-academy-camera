import { ChangeEvent } from 'react';
import { FilterCameraCategory, FilterCameraLevel, FilterCameraType } from '../../const';

type CatalogFilterProps = {
  category: FilterCameraCategory;
  types: FilterCameraType[];
  levels: FilterCameraLevel[];
  minPrice: number | undefined;
  maxPrice: number | undefined;
  onCategoryChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  onTypeChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  onLevelChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  onMinPriceChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  onMaxPriceChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  onResetButtonClick: () => void;
}

export default function CatalogFilter ({category, types, levels, minPrice, maxPrice, onCategoryChange, onTypeChange, onLevelChange, onMinPriceChange, onMaxPriceChange, onResetButtonClick}: CatalogFilterProps): JSX.Element {
  function checkIfCameraTypeSelected(type: FilterCameraType) {
    return types.includes(type);
  }

  function checkIfCameraLevelSelected(level: FilterCameraLevel) {
    return levels.includes(level);
  }

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input type="number" name="price" placeholder="от" value={minPrice} onChange={onMinPriceChange} />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input type="number" name="priceUp" placeholder="до" value={maxPrice} onChange={onMaxPriceChange} />
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Категория</legend>
          <div className="custom-radio catalog-filter__item">
            <label>
              <input type="radio" name="category" value="photocamera" checked={category === FilterCameraCategory.PhotoCamera} onChange={onCategoryChange} /><span className="custom-radio__icon"></span><span className="custom-radio__label">Фотокамера</span>
            </label>
          </div>
          <div className="custom-radio catalog-filter__item">
            <label>
              <input type="radio" name="category" value="videocamera" checked={category === FilterCameraCategory.VideoCamera} onChange={onCategoryChange} /><span className="custom-radio__icon"></span><span className="custom-radio__label">Видеокамера</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Тип камеры</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="digital" checked={checkIfCameraTypeSelected(FilterCameraType.Digital)} onChange={onTypeChange} /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Цифровая</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="film" checked={checkIfCameraTypeSelected(FilterCameraType.Film)} disabled={category === FilterCameraCategory.VideoCamera} onChange={onTypeChange} /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Плёночная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="snapshot" checked={checkIfCameraTypeSelected(FilterCameraType.Snapshot)} disabled={category === FilterCameraCategory.VideoCamera} onChange={onTypeChange} /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Моментальная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="collection" checked={checkIfCameraTypeSelected(FilterCameraType.Collection)} onChange={onTypeChange} /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Коллекционная</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Уровень</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="zero" checked={checkIfCameraLevelSelected(FilterCameraLevel.Zero)} onChange={onLevelChange} /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Нулевой</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="non-professional" checked={checkIfCameraLevelSelected(FilterCameraLevel.NonProfessional)} onChange={onLevelChange} /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Любительский</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="professional" checked={checkIfCameraLevelSelected(FilterCameraLevel.Professional)} onChange={onLevelChange} /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Профессиональный</span>
            </label>
          </div>
        </fieldset>
        <button className="btn catalog-filter__reset-btn" type="reset" onClick={onResetButtonClick}>Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

