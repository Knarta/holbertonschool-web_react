import { render, screen, within, fireEvent } from '@testing-library/react';
import CourseListRow from './CourseListRow';

test('Renders a header with one cell spanning two columns', () => {
  render(
    <table>
      <tbody>
        <CourseListRow
          isHeader={true}
          textFirstCell="First"
          textSecondCell={null}
        />
      </tbody>
    </table>,
  );

  const thElement = screen.getByRole('columnheader');
  expect(thElement).toHaveAttribute('colSpan', '2');
});

test('Renders a header with two cells when textSecondCell is provided', () => {
  render(
    <table>
      <tbody>
        <CourseListRow
          isHeader={true}
          textFirstCell="First"
          textSecondCell="Second"
        />
      </tbody>
    </table>,
  );

  const thElements = screen.getAllByRole('columnheader');
  expect(thElements).toHaveLength(2);
  expect(thElements[0]).toHaveTextContent('First');
  expect(thElements[1]).toHaveTextContent('Second');
});

test('Renders a regular row with two td cells and a checkbox', () => {
  const onChangeRowMock = jest.fn();

  render(
    <table>
      <tbody>
        <CourseListRow
          isHeader={false}
          textFirstCell="Data1"
          textSecondCell="Data2"
          id={1}
          isChecked={false}
          onChangeRow={onChangeRowMock}
        />
      </tbody>
    </table>,
  );

  const trElement = screen.getByRole('row');
  const tdElements = within(trElement).getAllByRole('cell');

  expect(trElement).toBeInTheDocument();
  expect(tdElements).toHaveLength(2);
  expect(tdElements[0]).toHaveTextContent('Data1');
  expect(tdElements[1]).toHaveTextContent('Data2');

  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox.checked).toBe(false);
});

test('Clicking checkbox calls onChangeRow with id and checked state', () => {
  const onChangeRowMock = jest.fn();

  render(
    <table>
      <tbody>
        <CourseListRow
          isHeader={false}
          textFirstCell="ES6"
          textSecondCell="60"
          id={1}
          isChecked={false}
          onChangeRow={onChangeRowMock}
        />
      </tbody>
    </table>,
  );

  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);

  expect(onChangeRowMock).toHaveBeenCalledWith(1, true);
});
