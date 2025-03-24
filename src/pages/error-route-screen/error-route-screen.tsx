import { useEffect } from 'react';
import { getDocumentTitle } from '../../utils/utils';
import { DocumentTitle } from '../../const';

function ErrorRouteScreen (): JSX.Element {
  useEffect(() => {
    document.title = getDocumentTitle(DocumentTitle.ErrorRoute);
  }, []);

  return (
    <>
      <h1>404 Not Found</h1>
      <br />
    </>
  );
}

export default ErrorRouteScreen;
