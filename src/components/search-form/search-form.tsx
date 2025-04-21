import { ChangeEvent, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/camera-data/camera-data-selectors';
import SearchFormItem from '../search-form-item/search-form-item';

export default function SearchForm (): JSX.Element {
  const [searchText, setSearchText] = useState<string>('');

  const cameras = useAppSelector(getCameras);

  function handleSearchInputChange (evt: ChangeEvent<HTMLInputElement>) {
    const text = evt.target.value;
    setSearchText(text);
  }

  return (
    <div className={searchText.length >= 3 ? 'form-search list-opened' : 'form-search'}>
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input className="form-search__input" type="text" autoComplete="off" placeholder="Поиск по сайту" value={searchText} onChange={handleSearchInputChange} />
        </label>
        <ul className="form-search__select-list">
          {cameras.map((camera) => {
            if (camera.name.toLowerCase().includes(searchText.toLowerCase())) {
              return <SearchFormItem camera={camera} key={camera.id} />;
            }
          })}
        </ul>
      </form>
      <button className="form-search__reset" style={searchText.length > 0 ? {display: 'block'} : {display: 'none'}} type="reset">
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

