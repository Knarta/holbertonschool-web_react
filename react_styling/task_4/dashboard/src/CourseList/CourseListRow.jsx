function CourseListRow({ isHeader = false, textFirstCell = '', textSecondCell = null }) {
  if (isHeader) {
    return (
      <>
        <tr className='bg-table-header opacity-[66%]'>
          {
            textSecondCell === null ? (
              <th className='border border-gray-400 text-center' colSpan={2}>{textFirstCell}</th>
            ) : (
              <>
                <th className='border border-gray-400 text-left'>{textFirstCell}</th>
                <th className='border border-gray-400 text-right'>{textSecondCell}</th>
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
          <td className='border border-gray-400 pl-[8px] text-left'>{textFirstCell}</td>
          <td className='border border-gray-400 pl-[8px] text-right'>{textSecondCell}</td>
        </tr>
      </>
    )
  }
}

export default CourseListRow