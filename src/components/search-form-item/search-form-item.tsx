import { Link } from 'react-router-dom';
import { CameraInfo } from '../../types/camera';
import { getCameraPathById } from '../../utils/utils';
import { useEffect, useRef } from 'react';

type SearchFormItemProps = {
  camera: CameraInfo;
  index: number;
  focus: boolean;
  setFocus: (index: number) => void;
}

export default function SearchFormItem ({camera, index, focus, setFocus}: SearchFormItemProps): JSX.Element {
  const focusRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (focus && focusRef?.current) {
      focusRef?.current.focus();
    }
  }, [focus]);

  function handleKeyDown () {
    setFocus(index);
  }

  return (
    <li className="form-search__select-item">
      <Link tabIndex={index} onKeyDown={handleKeyDown} ref={focusRef} to={getCameraPathById(camera.id)}>{camera.name}</Link>
    </li>
  );
}

