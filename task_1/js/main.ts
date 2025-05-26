interface Teacher {
  readonly firstName: string;
  readonly lastName: string;
  fullTimeEmployee: boolean;
  yearsOfExperience?: number;
  location: string;
  [key: string]: any;
}

interface Directors extends Teacher {
  numberOfReports: number;
}

interface printTeacherFunction {
  (firstName: string, lastName: string): string;
}

const printTeacher: printTeacherFunction = (firstName: string, lastName: string): string => {
  return `${firstName[0]}. ${lastName}`;
};

const teacher3: Teacher = {
  firstName: 'Damien',
  fullTimeEmployee: false,
  lastName: 'Billot',
  location: 'Panama',
  contract: false,
};

const director1: Directors = {
  firstName: 'Charlene',
  lastName: 'Martin',
  location: 'Panama',
  fullTimeEmployee: true,
  numberOfReports: 17,
};

console.log(teacher3);
console.log(director1);
console.log(printTeacher("Damien","Billot"));