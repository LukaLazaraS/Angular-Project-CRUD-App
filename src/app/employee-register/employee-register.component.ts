import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudService } from '../crud.service';
import { NewEmployee } from '../employee.model';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.scss']
})
export class EmployeeRegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({
    'name' : new FormControl(null, Validators.required),
    'salary' : new FormControl(null, Validators.required),
    'age' : new FormControl(null, Validators.required),
  });

  constructor(private crudService: CrudService) {

  }

  ngOnInit(): void {
  }

  onRegisterEmployee(){
    if(this.form.valid) {
      let newEmployee: NewEmployee = {
        name: this.form.value.name,
        salary: this.form.value.salary,
        age: this.form.value.age
      }
      this.crudService.createEmployee(newEmployee).subscribe(data => {
        alert(data.message);
        this.form.reset();
      })
    }
  }
}
