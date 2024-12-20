import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../service/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  standalone: false,

  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})

export class AddTaskComponent implements OnInit {
  taskForm: FormGroup;
  statusChoices: any;
  priorityChoices: any;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      priority: [''],
      status: ['']
    });
  }


  ngOnInit(): void {
    this.loadPriority();
    this.loadStatus();
  }


  get name() {
    return this.taskForm.get('name');
  }


  get description() {
    return this.taskForm.get('description');
  }


  get priority() {
    return this.taskForm.get('priority');
  }


  get status() {
    return this.taskForm.get('status');
  }


  loadPriority(): void {
    let observableResponse = this.taskService.getPriorityChoices();
    if (observableResponse) {
      observableResponse.subscribe(
        (response) => {
          this.priorityChoices = Object.entries(response).map(([key, value]) => ({ key, value }));
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }


  loadStatus(): void {
    let observableResponse = this.taskService.getStatusChoices()
    if (observableResponse) {
      observableResponse.subscribe(
        (response) => {
          this.statusChoices = Object.entries(response).map(([key, value]) => ({ key, value }))
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }


  onSubmit(): void {
    // let statusValue = this.taskForm.get('status')?.value;
    // if (statusValue == '') {
    //   this.taskForm.patchValue({status: 'pending'});
    // }
    // let priorityValue = this.taskForm.get('priority')?.value;
    // if (priorityValue == '') {
    //   this.taskForm.patchValue({priority: 'low'});
    // }
    let observableResponse = this.taskService.createTask(this.taskForm.value);
    if (observableResponse) {
      observableResponse.subscribe(
        (response) => {
          this.router.navigateByUrl('home');
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }
}
