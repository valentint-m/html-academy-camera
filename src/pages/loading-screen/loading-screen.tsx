import { useEffect } from 'react';
import { getDocumentTitle } from '../../utils/utils';
import { DocumentTitle } from '../../const';

export default function LoadingScreen (): JSX.Element {
  useEffect(() => {
    document.title = getDocumentTitle(DocumentTitle.Loading);
  }, []);

  return (
    <h1>Загрузка...</h1>
  );
}
