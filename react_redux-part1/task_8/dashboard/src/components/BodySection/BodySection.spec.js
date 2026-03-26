import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';

test('Renders a heading with the title and children', () => {
  render(
    <BodySection title="Test Title">
      <p>Test child content</p>
    </BodySection>,
  );

  const titleElement = screen.getByRole('heading', { name: /test title/i });
  expect(titleElement).toBeInTheDocument();
  expect(titleElement.tagName).toBe('H2');
  expect(screen.getByText('Test child content')).toBeInTheDocument();
});
