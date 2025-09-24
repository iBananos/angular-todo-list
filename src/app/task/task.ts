import { Component, input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TaskModel as TaskInfo } from '../models/task';
import { Tasks } from '../services/tasks';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.scss'
})
export class Task {
  private tasksService = inject(Tasks);
  private router = inject(Router);
  task = input.required<TaskInfo>();

  onToggleCompletion() {
    console.log('Task component - onToggleCompletion called for task:', this.task());
    this.tasksService.toggleDone(this.task());
  }

  onDeleteTask() {
    console.log('Task component - onDeleteTask called for task:', this.task());
    this.tasksService.remove(this.task());
  }

  onViewTask() {
    console.log('Task component - onViewTask called for task:', this.task());
    this.router.navigate(['/task', this.task().id]);
  }
}
