import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationVerificationPendingComponent } from './operation-verification-pending.component';

describe('OperationVerificationPendingComponent', () => {
  let component: OperationVerificationPendingComponent;
  let fixture: ComponentFixture<OperationVerificationPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationVerificationPendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationVerificationPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
