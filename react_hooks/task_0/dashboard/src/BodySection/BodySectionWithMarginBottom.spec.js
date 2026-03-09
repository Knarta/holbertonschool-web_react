import React from 'react';
import { render, screen } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

describe('BodySectionWithMarginBottom', () => {
  test('contains a div with the class bodySectionWithMargin', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="Test" />,
    );
    const div = container.querySelector('.bodySectionWithMargin');
    expect(div).toBeInTheDocument();
  });

  test('renders the BodySection component', () => {
    render(
      <BodySectionWithMarginBottom title="Test Title">
        <p>Child content</p>
      </BodySectionWithMarginBottom>,
    );
    expect(screen.getByRole('heading', { name: 'Test Title' })).toBeInTheDocument();
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });
});
