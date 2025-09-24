import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskModel } from '../models/task';
import { Tasks } from '../services/tasks';

@Component({
  selector: 'app-task-detail',
  imports: [],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss'
})
export class TaskDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tasksService = inject(Tasks);
  
  task = signal<TaskModel | null>(null);

  ngOnInit() {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.tasksService.tasks$.subscribe(tasks => {
      const foundTask = tasks.find((t: TaskModel) => t.id === taskId);
      
      if (foundTask) {
        this.task.set(foundTask);
      } else if (tasks.length > 0) {
        this.router.navigate(['/']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  onToggleCompletion() {
    const currentTask = this.task();
    if (currentTask) {
      this.tasksService.toggleDone(currentTask);
    }
  }

  onDeleteTask() {
    const currentTask = this.task();
    if (currentTask) {
      this.tasksService.remove(currentTask);
      this.router.navigate(['/']);
    }
  }
}