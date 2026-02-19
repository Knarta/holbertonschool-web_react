function CourseListRow({
    isHeader = false,
    textFirstCell = '',
    textSecondCell = null,
  }) {
    const headerRowClasses = 'bg-table-header opacity-[66%]';
    const bodyRowClasses = 'bg-table-rows opacity-[45%]';
    const cellClasses = 'border border-gray-400';

    if (isHeader) {
      if (textSecondCell === null) {
        return (
          <tr className={headerRowClasses}>
            <th colSpan={2} className={cellClasses}>{textFirstCell}</th>
          </tr>
        );
      }
      return (
        <tr className={headerRowClasses}>
          <th className={cellClasses}>{textFirstCell}</th>
          <th className={cellClasses}>{textSecondCell}</th>
        </tr>
      );
    }
    return (
      <tr className={bodyRowClasses}>
        <td className={`${cellClasses} pl-2`}>{textFirstCell}</td>
        <td className={`${cellClasses} pl-2`}>{textSecondCell}</td>
      </tr>
    );
  }
  
  export default CourseListRow;