import CourseListRow from "./CourseListRow";
import WithLogging from "../HOC/WithLogging.jsx";

function CourseList({ courses = [] }) {
  return (
    <div className="courses-container w-[80%] mx-auto p-8"> 
      <table
        id={courses.length === 0 ? "noCourse" : "coursesTable"}
        className="w-full border border-gray-400 border-collapse text-center font-bold [&_th]:font-bold [&_th]:text-center [&_tr]:font-bold [&_th:first-child]:w-[60%] [&_td:first-child]:w-[60%]"
      >
        {courses.length === 0 ? (
          <tbody>
            <CourseListRow textFirstCell="No course available yet" isHeader={false} />
          </tbody>
        ) : (
          <>
            <thead>
              <CourseListRow textFirstCell="Available courses" isHeader={true} />
              <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={true} />
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
          </>
        )}
      </table>
    </div>
  );
}

export default WithLogging(CourseList);
