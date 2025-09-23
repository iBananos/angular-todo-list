import { Component, input, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { Task } from "../task/task";
import { TaskModel as TaskInfo } from '../models/task';
import { Tasks } from '../tasks';

@Component({
  selector: 'app-taskslist',
  imports: [Task, AsyncPipe],
  templateUrl: './taskslist.html',
  styleUrl: './taskslist.scss'
})
export class Taskslist {
  private tasksService = inject(Tasks);
  
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
    const title = prompt('Task title:');
    const description = prompt('Task description:');
    
    if (title && description) {
      const newTask: TaskInfo = {
        id: Date.now(),
        title: title,
        description: description,
        completed: false
      };
      
      console.log('Taskslist - adding new task:', newTask);
      this.tasksService.add(newTask);
    }
  }
}
