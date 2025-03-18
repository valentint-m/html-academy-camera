import { useAppDispatch } from '../../hooks';
import { fetchCamerasAction } from '../../store/api-actions/api-actions';

function ErrorServerScreen(): JSX.Element {
  const dispatch = useAppDispatch();

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
