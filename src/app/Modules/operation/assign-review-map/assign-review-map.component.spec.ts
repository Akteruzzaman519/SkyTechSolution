import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignReviewMapComponent } from './assign-review-map.component';

describe('AssignReviewMapComponent', () => {
  let component: AssignReviewMapComponent;
  let fixture: ComponentFixture<AssignReviewMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignReviewMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignReviewMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
