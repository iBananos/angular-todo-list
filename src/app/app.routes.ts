import { Routes } from '@angular/router';
import { Home } from './home/home';
import { TaskDetail } from './task-detail/task-detail';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'task/:id',
        component: TaskDetail
    }
];
