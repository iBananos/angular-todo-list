import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskModel } from '../models/task';
import { Tasks } from '../services/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskFormService {
  private fb = inject(FormBuilder);
  private tasksService = inject(Tasks);

  createTaskForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]]
    });
  }

  submitTask(formValue: { title: string; description: string }): void {
    if (formValue.title && formValue.description) {
      const newTask: TaskModel = {
        id: Date.now(),
        title: formValue.title.trim(),
        description: formValue.description.trim(),
        completed: false
      };
      
      console.log('TaskFormService - adding new task:', newTask);
      this.tasksService.add(newTask);
    }
  }

  getFieldError(form: FormGroup, fieldName: string): string | null {
    const field = form.get(fieldName);
    if (field && field.invalid && (field.dirty || field.touched)) {
      if (field.errors?.['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (field.errors?.['minlength']) {
        const minLength = field.errors['minlength'].requiredLength;
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${minLength} characters`;
      }
      if (field.errors?.['maxlength']) {
        const maxLength = field.errors['maxlength'].requiredLength;
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must not exceed ${maxLength} characters`;
      }
    }
    return null;
  }
}