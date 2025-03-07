function ErrorServerScreen(): JSX.Element {
  return (
    <>
      <p className="error__text">Не удалось загрузить квесты</p>
      <button
        onClick={() => {

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
