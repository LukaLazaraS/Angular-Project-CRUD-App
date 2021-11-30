import { animate, animation, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudService } from '../crud.service';
import { NewEmployee } from '../employee.model';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.scss'],
  animations: [
    trigger('loader', [
      state('a', style({
        marginLeft: -350,
      })),
      state('b', style({
        marginLeft: 600,
      })),
      transition('a=> b', animate(400)),
      transition('b=> a', animate(400))
    ])
  ]
})
export class EmployeeRegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({
    'name': new FormControl(null, Validators.required),
    'salary': new FormControl(null, Validators.required),
    'age': new FormControl(null, Validators.required),
  });
  currentState: string = 'b';
  interval: any;


  constructor(private crudService: CrudService) {

  }

  ngOnInit(): void {
  }

  changeState() {
    this.currentState = this.currentState == 'a' ? 'b' : 'a';
    this.interval = setInterval(() => {
      this.currentState = this.currentState == 'a' ? 'b' : 'a';
    }, 400);
  }

  onRegisterEmployee() {
    if (this.form.valid) {
      this.changeState();
      let newEmployee: NewEmployee = {
        name: this.form.value.name,
        salary: this.form.value.salary,
        age: this.form.value.age
      }
      this.crudService.createEmployee(newEmployee).subscribe(data => {
        alert(data.message);
        this.form.reset();
        clearInterval(this.interval);
      })
    }
  }
}
