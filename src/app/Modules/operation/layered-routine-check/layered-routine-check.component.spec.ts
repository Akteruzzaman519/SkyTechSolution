import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayeredRoutineCheckComponent } from './layered-routine-check.component';

describe('LayeredRoutineCheckComponent', () => {
  let component: LayeredRoutineCheckComponent;
  let fixture: ComponentFixture<LayeredRoutineCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayeredRoutineCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayeredRoutineCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
