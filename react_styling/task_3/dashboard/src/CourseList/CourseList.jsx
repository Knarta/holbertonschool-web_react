import WithLogging from '../HOC/WithLogging.jsx'
import CourseListRow from './CourseListRow.jsx'

function CourseList({ courses = [] }) {
  return (
    <>
      <div className='w-full max-w-4xl mx-auto my-8 px-4 sm:px-0 overflow-x-auto'>
        <table id='CourseList' className='w-full min-w-[280px] border-collapse'>
          <thead>
            { courses.length === 0 ? (
                <CourseListRow isHeader={true} textFirstCell='No course available yet' />
              ) : (
                <>
                  <CourseListRow isHeader={true} textFirstCell="Available courses" />
                  <CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" />
                </>
              )
            }
          </thead>
          <tbody>
            {
              courses.map(course => {
                return <CourseListRow
                  key={course.id}
                  isHeader={false}
                  textFirstCell={course.name}
                  textSecondCell={course.credit}
                />
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default WithLogging(CourseList)