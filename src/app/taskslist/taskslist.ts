import { Component, input, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { Task } from "../task/task";
import { TaskForm } from "../task-form/task-form";
import { TaskModel as TaskInfo } from '../models/task';
import { Tasks } from '../services/tasks';

@Component({
  selector: 'app-taskslist',
  imports: [Task, TaskForm, AsyncPipe],
  templateUrl: './taskslist.html',
  styleUrl: './taskslist.scss'
})
export class Taskslist {
  private tasksService = inject(Tasks);
  
  showForm = false;
  
  // Apply sorting logic in component using pipe
  taskslist$ = this.tasksService.tasks$.pipe(
    map(tasks => this.sortTasks(tasks))
  );

  private sortTasks(tasks: TaskInfo[]): TaskInfo[] {
    return [...tasks].sort((a, b) => {
      if (a.completed === b.completed) {
        return a.id - b.id; 
      }
      if(!a.completed && !b.completed) {
        return a.id - b.id; 
      }
      return a.completed ? 1 : -1;
    });
  }

  onAddTask() {
    this.showForm = true;
  }

  onTaskAdded() {
    this.showForm = false;
  }
}
