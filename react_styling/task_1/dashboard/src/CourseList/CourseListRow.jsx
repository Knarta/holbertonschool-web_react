import { render, screen } from '@testing-library/react';
import CourseListRow from './CourseListRow.jsx';

test('isHeader true and textSecondCell null', () => {
  render(
    <>
      <table>
        <thead>
          <CourseListRow
            isHeader={true}
            textFirstCell="Testing"
            textSecondCell={null}
          />
        </thead>
      </table>
    </>,
  );

  const tableHeader = screen.getByText('Testing');

  expect(screen.getAllByRole('columnheader').length).toBe(1);
  // expect(tableHeader.colSpan).toBe(2)
  expect(tableHeader).toHaveAttribute('colspan', '2');
});

test('isHeader true and textSecondCell is not null', () => {
  render(
    <>
      <table>
        <thead>
          <CourseListRow
            isHeader={true}
            textFirstCell="Testing"
            textSecondCell="Testing 2"
          />
        </thead>
      </table>
    </>,
  );

  expect(screen.getAllByRole('columnheader').length).toBe(2);
});

test('should render two td if isHeader false', () => {
  render(
    <>
      <table>
        <tbody>
          <CourseListRow
            isHeader={false}
            textFirstCell="Testing"
            textSecondCell="Testing2"
          />
        </tbody>
      </table>
    </>,
  );

  expect(screen.getAllByRole('row').length).toBe(1);
  expect(screen.getAllByRole('cell').length).toBe(2);
});