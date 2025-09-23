import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Taskslist } from './taskslist';

describe('Taskslist', () => {
  let component: Taskslist;
  let fixture: ComponentFixture<Taskslist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Taskslist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Taskslist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
