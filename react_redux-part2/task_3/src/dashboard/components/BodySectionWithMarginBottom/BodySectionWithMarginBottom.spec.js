import { render, screen } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

test('Renders title and children correctly', () => {
  const { container } = render(
    <BodySectionWithMarginBottom title="Hello!">
      <p>This is child content</p>
    </BodySectionWithMarginBottom>,
  );

  expect(screen.getByRole('heading', { name: /hello/i })).toBeInTheDocument();
  expect(screen.getByText('This is child content')).toBeInTheDocument();
  expect(container.firstChild.className).toMatch(/bodySectionWithMargin/);
});
