import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Tasks } from '../tasks';

@Component({
  selector: 'app-task-counters-signal',
  imports: [],
  templateUrl: './task-counters-signal.html',
  styleUrl: './task-counters-signal.scss'
})
export class TaskCountersSignal {
  private tasksService = inject(Tasks);
  
  // Convert observable to signal
  private tasksSignal = toSignal(this.tasksService.tasks$, { initialValue: [] });
  
  // Computed signals for task counters
  totalTasks = computed(() => this.tasksSignal().length);
  
  activeTasks = computed(() => 
    this.tasksSignal().filter(task => !task.completed).length
  );
  
  completedTasks = computed(() => 
    this.tasksSignal().filter(task => task.completed).length
  );
}
