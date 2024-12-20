import { Component, OnInit } from '@angular/core';
import { TaskService } from '../service/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  tasks: any;

  constructor(
    private taskService: TaskService
  ) { }


  ngOnInit(): void {
    let observableResponse = this.taskService.getAllTask();
    if (observableResponse) {
      observableResponse.subscribe(
        (response) => {
          this.tasks = response;
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }


  onDeleteBtnClick(id: any): void {
    let observableResponse = this.taskService.deleteTask(id);
    if (observableResponse) {
      observableResponse.subscribe(
        (response) => {
          this.ngOnInit();
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }
}
