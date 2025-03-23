import { render, screen } from '@testing-library/react';
import ErrorRouteScreen from './error-route-screen';

describe('Component: ErrorRouteScreen', () => {
  it('should render correctly.', () => {
    const expectedText = '404 Not Found';

    render(<ErrorRouteScreen />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
