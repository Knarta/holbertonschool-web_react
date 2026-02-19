import CourseListRow from './CourseListRow';

function CourseList({ courses = [] }) {
  if (courses.length === 0) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <table id="noCourse" className="w-full border border-black text-center font-bold">
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
    <div className="flex justify-center items-center w-full h-full">
      <table id="coursesTable" className="w-full border border-black border-collapse">
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