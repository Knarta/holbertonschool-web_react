import CourseListRow from "./CourseListRow";
import WithLogging from "../HOC/WithLogging.jsx";

function CourseList({ courses = [] }) {
  if (courses.length === 0) {
    return (
      <div className="courses-container w-[80%] mx-auto p-8">
        <table
          id="noCourse"
          className="w-full min-w-full border border-black border-collapse text-center font-bold [&_th]:font-bold [&_th]:text-center [&_tr]:font-bold [&_th:first-child]:w-[60%] [&_td:first-child]:w-[60%]"
        >
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
    <div className="courses-container w-[80%] mx-auto p-8">
      <table
        id="coursesTable"
        className="w-full min-w-full border border-black border-collapse [&_th]:font-bold [&_th]:text-center [&_tr]:font-bold [&_th:first-child]:w-[60%] [&_td:first-child]:w-[60%]"
      >
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

export default WithLogging(CourseList);