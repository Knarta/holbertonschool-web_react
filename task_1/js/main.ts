interface Teacher {
  readonly firstName: string;
  readonly lastName: string;
  fullTimeEmployee: boolean;
  yearsOfExperience?: number;
  location: string;
  [key: string]: any;
}

const teacher3: Teacher = {
  firstName: 'Damien',
  fullTimeEmployee: false,
  lastName: 'Billot',
  location: 'Panama',
  contract: false,
};

console.log(teacher3); 