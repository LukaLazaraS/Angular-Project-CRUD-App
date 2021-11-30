import { animate, animation, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudService } from '../crud.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
  animations: [
    trigger('loader', [
      state('a', style({
        marginLeft: -350,
      })),
      state('b', style({
        marginLeft: 1050,
      })),
      transition('* => b', animate(400)),
      transition('a=> b', animate(400)),
      transition('b=> a', animate(400))
    ]),
    trigger('modalContent', [
      state('close', style({
        right: '-20vw',
      })),
      state('open', style({
        right: '50vw',
      })),
      transition('close => open', animate('400ms cubic-bezier(.17,-0.23,.63,1.5)')),
      transition('open => close', animate('400ms cubic-bezier(.17,-0.5,.88,1)')),
    ])
  ]
})
export class EmployeesListComponent implements OnInit {
  form: FormGroup = new FormGroup({
    'id': new FormControl({ value: null, disabled: true }, Validators.required),
    'name': new FormControl(null, Validators.required),
    'salary': new FormControl(null, Validators.required),
    'age': new FormControl(null, Validators.required),
  });

  employees: Employee[] = [];
  page: number = 1;
  isDisableForm: boolean = false;
  currentId: number | undefined;

  interval: any;
  currentState: string = 'b';
  modalState: string = 'close';

  startInterval = () => {
    this.currentState = this.currentState == 'a' ? 'b' : 'a';
  }

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.currentState = this.currentState == 'a' ? 'b' : 'a';
    this.changeState();
    this.crudService.getEmployees().subscribe(employees => {
      clearInterval(this.interval);
      this.employees = employees.data;
    },
      err => {
        location.reload();
      })
  }


  changeState() {
    this.currentState = this.currentState == 'a' ? 'b' : 'a';
    this.interval = setInterval(this.startInterval, 400);
  }

  onDeleteUser(id: number | undefined) {
    this.currentId = id;
    this.modalState = 'open';
  }

  onModalYes(id: number | undefined = this.currentId) {
    this.changeState();
    this.modalState = 'close';
    this.crudService.deleteEmployeeById(id).subscribe(data => {
      clearInterval(this.interval);
      alert(data.message);
    })
  }
  onModalNo() {
    this.modalState = 'close';
  }

  onEditUser(id: number | undefined) {
    this.changeState();
    this.crudService.getEmployeeById(id).subscribe(employee => {
      this.form.controls['id'].setValue(employee.data.id);
      this.form.controls['name'].setValue(employee.data.employee_name);
      this.form.controls['age'].setValue(employee.data.employee_age);
      this.form.controls['salary'].setValue(employee.data.employee_salary);
      this.isDisableForm = true;
      clearInterval(this.interval);
    })
  }

  onSaveEmployee() {
    this.changeState();
    let employoe = {
      name: this.form.value.name,
      salary: this.form.value.salary,
      age: this.form.value.age
    }
    this.crudService.updateEmployee(employoe, this.form.value.id).subscribe(data => {
      alert(data.message);
      this.form.reset();
      this.isDisableForm = false;
      clearInterval(this.interval);
    })
  }

  onExitEditEmployee() {
    this.form.reset();
    this.isDisableForm = false;
  }
}
