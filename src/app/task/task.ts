import { Component, input, inject } from '@angular/core';
import { TaskModel as TaskInfo } from '../models/task';
import { Tasks } from '../tasks';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.scss'
})
export class Task {
  private tasksService = inject(Tasks);
  task = input.required<TaskInfo>();

  onToggleCompletion() {
    console.log('Task component - onToggleCompletion called for task:', this.task());
    this.tasksService.toggleDone(this.task());
  }

  onDeleteTask() {
    console.log('Task component - onDeleteTask called for task:', this.task());
    this.tasksService.remove(this.task());
  }
}
