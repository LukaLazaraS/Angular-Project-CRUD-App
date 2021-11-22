export interface Employee {
  id?: number;
  employee_name: string;
  employee_salary: number;
  employee_age: number;
  profile_image?: string;
}

export interface NewEmployee {
  name: string;
  salary: number;
  age: number;
}