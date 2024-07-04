import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignChangeMapInfoComponent } from './assign-change-map-info.component';

describe('AssignChangeMapInfoComponent', () => {
  let component: AssignChangeMapInfoComponent;
  let fixture: ComponentFixture<AssignChangeMapInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignChangeMapInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignChangeMapInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
