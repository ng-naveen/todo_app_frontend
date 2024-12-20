import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../service/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  standalone: false,

  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
  providers: [DatePipe]
})

export class EditTaskComponent implements OnInit {
  task_id: any;
  priorityChoices: any;
  statusChoices: any;
  taskEditForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.task_id = this.route.snapshot.params['id'];
    this.taskEditForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      priority: [''],
      status: [''],
      created_at: [],
      completed_at: ['']
    });
  };


  ngOnInit(): void {
    this.loadPriority();
    this.loadStatus();
    this.getTaskDetails()
  }


  get name() {
    return this.taskEditForm.get('name');
  }


  get description() {
    return this.taskEditForm.get('description');
  }


  get priority() {
    return this.taskEditForm.get('priority');
  }


  get status() {
    return this.taskEditForm.get('status');
  }


  disableDates = (date: Date | null): boolean => {

    const getDateOnly = (date: Date): Date =>
      new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const todayDate = getDateOnly(new Date());
    const createdAt = this.taskEditForm.get('created_at')?.value;

    if (!date || !createdAt) {
      return false;
    }

    const createdDate = getDateOnly(new Date(createdAt))
    return date <= todayDate && date >= createdDate;
  };


  private loadPriority(): void {
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


  private loadStatus(): void {
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


  private getTaskDetails(): void {
    let observableResponse = this.taskService.getTaskById(this.task_id);
    if (observableResponse) {
      observableResponse.subscribe(
        (response) => {
          this.taskEditForm.patchValue(response);
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }


  onSubmit(): void {
    let formValue = this.taskEditForm.value;
    if (formValue.completed_at) {
      formValue.completed_at = this.datePipe.transform(formValue.completed_at, 'yyyy-MM-dd');
    }
    let observableResponse = this.taskService.updateTask(this.task_id, formValue);
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
