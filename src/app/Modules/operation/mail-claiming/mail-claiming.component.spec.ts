import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailClaimingComponent } from './mail-claiming.component';

describe('MailClaimingComponent', () => {
  let component: MailClaimingComponent;
  let fixture: ComponentFixture<MailClaimingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailClaimingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailClaimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
