import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TaskModel as TaskInfo } from './models/task';
import { TaskApiModel as ApiTodo } from './models/taskApi';

@Injectable({
  providedIn: 'root'
})
export class Tasks {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  private tasks: TaskInfo[] = [];
  private tasksSubject = new BehaviorSubject<TaskInfo[]>([]);

  private taskDescriptions = new Map<number, string>();

  public tasks$ = this.tasksSubject.asObservable();

  constructor() {
    this.loadTasksFromApi();
  }

  private loadTasksFromApi(): void {
    console.log('Loading tasks from API...');
    this.http.get<ApiTodo[]>(`${this.apiUrl}?_limit=10`)
      .pipe(
        map(apiTodos => apiTodos.map(todo => {
          const description = this.taskDescriptions.get(todo.id) || `Todo item from user ${todo.userId}`;
          return {
            id: todo.id,
            title: todo.title,
            description: description,
            completed: todo.completed
          };
        })),
        catchError(error => {
          console.error('Error loading tasks from API:', error);
          return of([]);
        })
      )
      .subscribe(tasks => {
        console.log('Tasks loaded from API:', tasks);
        this.tasks = tasks;
        this.emitTasksUpdate();
      });
  }

  private emitTasksUpdate() {
    this.tasksSubject.next([...this.tasks]);
  }

  add(task: TaskInfo) {
    console.log('Adding task via API:', task);

    const apiTodo = {
      title: task.title,
      completed: task.completed,
      userId: 1
    };

    this.http.post<ApiTodo>(this.apiUrl, apiTodo)
      .pipe(
        map(createdTodo => {
          this.taskDescriptions.set(createdTodo.id, task.description);

          return {
            id: createdTodo.id,
            title: createdTodo.title,
            description: task.description,
            completed: createdTodo.completed
          };
        }),
        catchError(error => {
          console.error('Error creating task via API:', error);
          const tempId = Date.now();
          this.taskDescriptions.set(tempId, task.description);
          return of({ ...task, id: tempId });
        })
      )
      .subscribe(createdTask => {
        console.log('Task created:', createdTask);
        this.tasks.push(createdTask);
        this.emitTasksUpdate();
      });
  }

  remove(task: TaskInfo) {
    console.log('Removing task via API:', task);

    this.http.delete(`${this.apiUrl}/${task.id}`)
      .pipe(
        catchError(error => {
          console.error('Error deleting task via API:', error);
          return of(null);
        })
      )
      .subscribe(() => {
        console.log('Task deleted from API');
        const index = this.tasks.indexOf(task);
        if (index >= 0) {
          this.tasks.splice(index, 1);
          this.emitTasksUpdate();
        }
      });
  }

  toggleDone(task: TaskInfo) {
    console.log('Toggling done status for task via API:', task);

    const updatedTask = { ...task, completed: !task.completed };

    const apiTodo = {
      id: task.id,
      title: task.title,
      completed: updatedTask.completed,
      userId: 1
    };

    this.http.put<ApiTodo>(`${this.apiUrl}/${task.id}`, apiTodo)
      .pipe(
        catchError(error => {
          console.error('Error updating task via API:', error);
          return of(apiTodo);
        })
      )
      .subscribe(updatedApiTodo => {
        console.log('Task updated via API:', updatedApiTodo);

        const taskIndex = this.tasks.indexOf(task);
        if (taskIndex >= 0) {
          this.tasks[taskIndex].completed = updatedApiTodo.completed;
          this.emitTasksUpdate();
        }
      });
  }

}
