import { BrowserRouter } from 'react-router-dom';

export function withRouter(component: JSX.Element) {
  return (
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
}
