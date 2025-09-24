import { Component, inject } from '@angular/core';
import { Taskslist } from "../taskslist/taskslist";
import { TaskCounters } from "../task-counters/task-counters";
import { TaskCountersSignal } from "../task-counters-signal/task-counters-signal";
import { Tasks } from '../services/tasks';

@Component({
  selector: 'app-home',
  imports: [ Taskslist, TaskCounters, TaskCountersSignal],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  private tasksService = inject(Tasks);
}
