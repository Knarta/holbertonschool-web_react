import WithLogging from '../HOC/WithLogging.jsx'
import CourseListRow from './CourseListRow.jsx'

function CourseList({ courses = [] }) {
  return (
    <>
      <div className='w-4/5 mx-auto my-8'>
        <table id='CourseList' className='w-full border-collapse'>
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