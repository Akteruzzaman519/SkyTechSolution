import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToManageUserComponent } from './to-manage-user.component';

describe('ToManageUserComponent', () => {
  let component: ToManageUserComponent;
  let fixture: ComponentFixture<ToManageUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToManageUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToManageUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
