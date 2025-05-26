interface Student {
  firstName: string;
  lastName: string;
  age: number;
  location: string;
}

const student1: Student = {
  firstName: 'Brenda',
  lastName: 'Pollagba',
  age: 22,
  location: 'New York City'
};

const student2: Student = {
  firstName: 'Hilliass',
  lastName: 'Soumahill',
  age: 29,
  location: 'Toulouse'
};

const studentsList: Student[] = [student1, student2];

console.log(studentsList);