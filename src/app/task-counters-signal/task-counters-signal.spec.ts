import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCounters } from './task-counters';

describe('TaskCounters', () => {
  let component: TaskCounters;
  let fixture: ComponentFixture<TaskCounters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCounters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCounters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
