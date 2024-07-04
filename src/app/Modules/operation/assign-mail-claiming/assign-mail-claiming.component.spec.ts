import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignMailClaimingComponent } from './assign-mail-claiming.component';

describe('AssignMailClaimingComponent', () => {
  let component: AssignMailClaimingComponent;
  let fixture: ComponentFixture<AssignMailClaimingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignMailClaimingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignMailClaimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
