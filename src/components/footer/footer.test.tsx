import { render, screen } from '@testing-library/react';
import { withRouter } from '../../utils/mock-components';
import Footer from './footer';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const expectedDescriptionText = 'Интернет-магазин фото- и видеотехники';
    const expectedLinkText = 'Курсы операторов';

    render(withRouter(<Footer />));

    expect(screen.getByText(expectedDescriptionText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
