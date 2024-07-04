import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMailCredentialComponent } from './change-mail-credential.component';

describe('ChangeMailCredentialComponent', () => {
  let component: ChangeMailCredentialComponent;
  let fixture: ComponentFixture<ChangeMailCredentialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeMailCredentialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeMailCredentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
