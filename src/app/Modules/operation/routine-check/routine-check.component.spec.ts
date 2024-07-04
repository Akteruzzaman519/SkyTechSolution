import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineCheckComponent } from './routine-check.component';

describe('RoutineCheckComponent', () => {
  let component: RoutineCheckComponent;
  let fixture: ComponentFixture<RoutineCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutineCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutineCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
