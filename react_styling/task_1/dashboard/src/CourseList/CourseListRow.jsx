function CourseListRow({ isHeader = false, textFirstCell = '', textSecondCell = null }) {
  if (isHeader) {
    return (
      <>
        <tr className='bg-table-header opacity-[66%]'>
          {
            textSecondCell === null ? (
              <th className='border border-gray-400' colSpan={2}>{textFirstCell}</th>
            ) : (
              <>
                <th className='border border-gray-400'>{textFirstCell}</th>
                <th className='border border-gray-400'>{textSecondCell}</th>
              </>
            )
          }
        </tr>
      </>
    )
  } else {
    return (
      <>
        <tr className='bg-table-rows opacity-[45%]'>
          <td className='border border-gray-400 pl-[8px]'>{textFirstCell}</td>
          <td className='border border-gray-400 pl-[8px]'>{textSecondCell}</td>
        </tr>
      </>
    )
  }
}

export default CourseListRow