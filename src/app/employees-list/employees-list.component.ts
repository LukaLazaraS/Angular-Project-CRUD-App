import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudService } from '../crud.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  form: FormGroup = new FormGroup({
    'id' : new FormControl({value: null, disabled: true}, Validators.required),
    'name' : new FormControl(null, Validators.required),
    'salary' : new FormControl(null, Validators.required),
    'age' : new FormControl(null, Validators.required),
  });
  employees: Employee[] = [];
  page: number = 1;
  isDisableForm: boolean = false;

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.getEmployees().subscribe(employees => {
      this.employees = employees.data;
    },
    err => {
      location.reload();
    })
  }

  onDeleteUser(id: number | undefined){
    this.crudService.deleteEmployeeById(id).subscribe(data => {
      alert(data.message);
    })
  }

  onEditUser(id: number | undefined){
    this.crudService.getEmployeeById(id).subscribe(employee => {
      this.form.controls['id'].setValue(employee.data.id);
      this.form.controls['name'].setValue(employee.data.employee_name);
      this.form.controls['age'].setValue(employee.data.employee_age);
      this.form.controls['salary'].setValue(employee.data.employee_salary);
      this.isDisableForm = true;
    })
  }

  onSaveEmployee(){
    let employoe = {
      name: this.form.value.name,
      salary: this.form.value.salary,
      age: this.form.value.age
    }
    this.crudService.updateEmployee(employoe, this.form.value.id).subscribe(data => {
      alert(data.message);
      this.form.reset();
      this.isDisableForm = false;
    })
  }

  onExitEditEmployee(){
    this.form.reset();
    this.isDisableForm = false;
  }
}
