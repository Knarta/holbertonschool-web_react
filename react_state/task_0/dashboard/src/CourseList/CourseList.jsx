import CourseListRow from './CourseListRow';
import './CourseList.css';

function CourseList({ courses = [] }) {
  if (courses.length === 0) {
    return (
      <div className="courses-container">
        <table id="noCourse">
          <tbody>
            <CourseListRow
              textFirstCell="No course available yet"
              isHeader={false}
            />
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div className="courses-container">
      <table id="coursesTable">
        <thead>
          <CourseListRow textFirstCell="Available courses" isHeader={true} />
          <CourseListRow
            textFirstCell="Course name"
            textSecondCell="Credit"
            isHeader={true}
          />
        </thead>
        <tbody>
          {courses.map((course) => (
            <CourseListRow
              key={course.id}
              textFirstCell={course.name}
              textSecondCell={course.credit}
              isHeader={false}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseList;