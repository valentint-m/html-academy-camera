import { Link } from 'react-router-dom';
import { CameraInfo } from '../../types/camera';
import { getCameraPathById } from '../../utils/utils';

type SearchFormItemProps = {
  camera: CameraInfo;
}

export default function SearchFormItem ({camera}: SearchFormItemProps): JSX.Element {
  return (
    <li className="form-search__select-item" >
      <Link tabIndex={0} to={getCameraPathById(camera.id)}>{camera.name}</Link>
    </li>
  );
}

