import { Component, inject, output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Tasks } from '../services/tasks';
import { TaskModel } from '../models/task';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})
export class TaskForm {
  private tasksService = inject(Tasks);
  
  // Template-driven form model
  taskModel: { title: string; description: string } = {
    title: '',
    description: ''
  };
  
  taskAdded = output<void>();

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const newTask: TaskModel = {
        id: Date.now(),
        title: this.taskModel.title.trim(),
        description: this.taskModel.description.trim(),
        completed: false
      };
      
      console.log('TaskForm - adding new task:', newTask);
      this.tasksService.add(newTask);
      
      // Reset form
      form.resetForm();
      this.taskModel = { title: '', description: '' };
      this.taskAdded.emit();
    }
  }

  onCancel(form: NgForm): void {
    form.resetForm();
    this.taskModel = { title: '', description: '' };
    this.taskAdded.emit();
  }

  isFieldInvalid(field: any): boolean {
    return field && field.invalid && (field.dirty || field.touched);
  }

  getFieldError(field: any, fieldName: string): string | null {
    if (this.isFieldInvalid(field)) {
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