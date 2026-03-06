import { expect, jest, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import BodySection from './BodySection';

describe('test of bodysection', () => {
  test('BodySection component renders a heading with the title prop value', () => {
    render(<BodySection title="test" />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('test');
  });

  test('BodySection component renders any number of children passed to it', () => {
    const children = [<p>Test 1</p>, <p>Test 2</p>, <p>Test 3</p>];
    render(<BodySection title="Test Section">{children}</BodySection>);
    expect(React.Children.count(children)).toBe(3);
    expect(screen.getAllByText(/Test \d/).length).toBe(3);
  });
});