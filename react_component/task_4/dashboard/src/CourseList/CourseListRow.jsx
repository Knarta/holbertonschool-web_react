function CourseListRow({
    isHeader = false,
    textFirstCell = '',
    textSecondCell = null,
  }) {
    const cellClass = "border border-black p-2";
    if (isHeader) {
      if (textSecondCell === null) {
        return (
          <tr>
            <th colSpan={2} className={`${cellClass} font-bold text-center`}>{textFirstCell}</th>
          </tr>
        );
      }
      return (
        <tr>
          <th className={`${cellClass} font-bold text-center`}>{textFirstCell}</th>
          <th className={`${cellClass} font-bold text-center`}>{textSecondCell}</th>
        </tr>
      );
    }
    return (
      <tr>
        <td className={cellClass}>{textFirstCell}</td>
        <td className={cellClass}>{textSecondCell}</td>
      </tr>
    );
  }
  
  export default CourseListRow;