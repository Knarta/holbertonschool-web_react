/// <reference path="./Teacher.ts" />

namespace Subjects {
    export class Subject {
        teacher: Teacher | undefined;

        setTeacher(teacher: Teacher) {
            this.teacher = teacher;
        }
    }
} 