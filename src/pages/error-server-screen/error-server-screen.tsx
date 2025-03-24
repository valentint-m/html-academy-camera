import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { fetchCamerasAction } from '../../store/api-actions/api-actions';
import { getDocumentTitle } from '../../utils/utils';
import { DocumentTitle } from '../../const';

function ErrorServerScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = getDocumentTitle(DocumentTitle.ErrorServer);
  }, []);

  return (
    <>
      <p className="error__text">Не удалось загрузить данные.</p>
      <button
        onClick={() => {
          dispatch(fetchCamerasAction);
        }}
        className="replay replay--error"
        type="button"
      >
        Попробовать ещё раз
      </button>
    </>
  );
}

export default ErrorServerScreen;
