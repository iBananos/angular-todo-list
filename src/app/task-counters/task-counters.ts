import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { Tasks } from '../services/tasks';

@Component({
  selector: 'app-task-counters',
  imports: [AsyncPipe],
  templateUrl: './task-counters.html',
  styleUrl: './task-counters.scss'
})
export class TaskCounters {
  private tasksService = inject(Tasks);
  
  // Observables for task counters
  totalTasks$ = this.tasksService.tasks$.pipe(
    map(tasks => tasks.length)
  );
  
  activeTasks$ = this.tasksService.tasks$.pipe(
    map(tasks => tasks.filter(task => !task.completed).length)
  );
  
  completedTasks$ = this.tasksService.tasks$.pipe(
    map(tasks => tasks.filter(task => task.completed).length)
  );
}
