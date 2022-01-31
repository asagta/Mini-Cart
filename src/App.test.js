import { render, screen } from '@testing-library/react';
import MainCart from './../src/views/MainCart';
import App from './App';

test('Products are rendering', () => {
  render(
    <App>
      <MainCart />
    </App>
  );
  const linkElement1 = screen.getByText(/Items/i);
  expect(linkElement1).toBeInTheDocument();
});
