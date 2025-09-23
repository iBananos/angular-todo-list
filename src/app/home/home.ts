import { Component, inject } from '@angular/core';
import { Taskslist } from "../taskslist/taskslist";
import { TaskCounters } from "../task-counters/task-counters";
import { Tasks } from '../tasks';

@Component({
  selector: 'app-home',
  imports: [ Taskslist, TaskCounters],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  private tasksService = inject(Tasks);
}
