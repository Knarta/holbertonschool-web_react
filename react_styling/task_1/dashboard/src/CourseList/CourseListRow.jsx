function CourseListRow({ isHeader = false, textFirstCell = '', textSecondCell = null }) {
  const headerStyle = { backgroundColor: 'var(--color-table-header)' };
  const rowStyle = { backgroundColor: 'var(--color-table-rows)' };

  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr style={headerStyle}>
          <th colSpan={2} className="border border-gray-400 px-2">{textFirstCell}</th>
        </tr>
      );
    }
    return (
      <tr style={headerStyle}>
        <th className="border border-gray-400 px-2">{textFirstCell}</th>
        <th className="border border-gray-400 px-2">{textSecondCell}</th>
      </tr>
    );
  }

  return (
    <tr style={rowStyle}>
      <td className="border border-gray-400 px-2">{textFirstCell}</td>
      <td className="border border-gray-400 px-2">{textSecondCell}</td>
    </tr>
  );
}

export default CourseListRow;