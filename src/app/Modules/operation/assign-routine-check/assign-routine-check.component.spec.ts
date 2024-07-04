import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRoutineCheckComponent } from './assign-routine-check.component';

describe('AssignRoutineCheckComponent', () => {
  let component: AssignRoutineCheckComponent;
  let fixture: ComponentFixture<AssignRoutineCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignRoutineCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignRoutineCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
