import { ChangeEvent, useRef, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/camera-data/camera-data-selectors';
import SearchFormItem from '../search-form-item/search-form-item';

const MIN_SEARCH_LENGTH_TO_OPEN_LIST = 3;
const MIN_SEARCH_LENGTH_TO_SHOW_RESET_BUTTON = 1;

export default function SearchForm (): JSX.Element {
  const [searchText, setSearchText] = useState<string>('');
  const camerasListRef = useRef<null | HTMLUListElement>(null);

  const cameras = useAppSelector(getCameras);

  function checkIfCamerasFound () {
    if (camerasListRef.current) {
      return camerasListRef.current.childNodes.length > 0;
    }
  }

  function handleSearchInputChange (evt: ChangeEvent<HTMLInputElement>) {
    const text = evt.target.value;
    setSearchText(text);
  }

  function handleResetButtonClick () {
    setSearchText('');
  }

  return (
    <div className={searchText.length >= MIN_SEARCH_LENGTH_TO_OPEN_LIST && checkIfCamerasFound() ? 'form-search list-opened' : 'form-search'}>
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input className="form-search__input" type="text" autoComplete="off" placeholder="Поиск по сайту" value={searchText} onChange={handleSearchInputChange} />
        </label>
        <ul className="form-search__select-list" ref={camerasListRef} >
          {cameras.map((camera) => {
            if (camera.name.toLowerCase().includes(searchText.toLowerCase()) && searchText) {
              return <SearchFormItem camera={camera} key={camera.id} />;
            }
          })}
        </ul>
      </form>
      <button className="form-search__reset" style={searchText.length >= MIN_SEARCH_LENGTH_TO_SHOW_RESET_BUTTON ? {display: 'block'} : {display: 'none'}} type="reset" onClick={handleResetButtonClick}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

