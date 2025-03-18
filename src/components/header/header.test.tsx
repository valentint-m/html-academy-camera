import { render, screen } from '@testing-library/react';
import { withRouter } from '../../utils/mock-components';
import Header from './header';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const expectedLinkText = 'О компании';

    render(withRouter(<Header />));

    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
