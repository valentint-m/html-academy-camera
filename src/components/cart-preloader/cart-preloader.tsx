export default function CartPreloader (): JSX.Element {
  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Отправка...</p>
        </div>
      </div>
    </div>
  );
}
