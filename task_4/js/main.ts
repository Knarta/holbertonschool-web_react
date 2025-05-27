/// <reference path="./subjects/Teacher.ts" />
/// <reference path="./subjects/Subject.ts" />
/// <reference path="./subjects/Cpp.ts" />
/// <reference path="./subjects/Java.ts" />
/// <reference path="./subjects/React.ts" />

const cTeacher: Subjects.Teacher = {
    firstName: "John",
    lastName: "Doe",
    experienceTeachingC: 5,
};

const javaTeacher: Subjects.Teacher = {
    firstName: "Jane",
    lastName: "Smith",
    experienceTeachingJava: 0,
};

const reactTeacher: Subjects.Teacher = {
    firstName: "Alice",
    lastName: "Johnson",
    experienceTeachingReact: 2,
};

const cpp = new Subjects.Cpp();
cpp.setTeacher(cTeacher);
console.log("C++");
console.log(cpp.getRequirements());
console.log(cpp.getAvailableTeacher());

const java = new Subjects.Java();
java.setTeacher(javaTeacher);
console.log("Java");
console.log(java.getRequirements());
console.log(java.getAvailableTeacher());

const react = new Subjects.React();
react.setTeacher(reactTeacher);
console.log("React");
console.log(react.getRequirements());
console.log(react.getAvailableTeacher()); 