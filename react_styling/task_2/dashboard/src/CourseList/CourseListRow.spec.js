import CourseListRow from './CourseListRow';
import { render, screen } from '@testing-library/react';

describe('course list row tests', () => {
  test('when isHeader is true and textSecondCell is null, renders one th with colspan=2', () => {
    render(<CourseListRow isHeader={true} textSecondCell={null} />);
    const header = screen.getByRole('columnheader');
    expect(header).toBeInTheDocument();
    expect(header).toHaveAttribute('colspan', '2');
  });

  test('when isHeader is true and textSecondCell not null, redner twh th', () => {
    render(<CourseListRow isHeader={true} textSecondCell={'Bonjour'} />);
    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(2);
  });

  test('when isHeader false, renders two td within a tr', () => {
    render(<CourseListRow isHeader={false} />);
    const row = screen.getByRole('row');
    expect(row).toBeInTheDocument();
    const cells = screen.getAllByRole('cell');
    expect(cells).toHaveLength(2);
  });
});