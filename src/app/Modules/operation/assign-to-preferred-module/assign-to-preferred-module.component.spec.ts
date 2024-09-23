import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignToPreferredModuleComponent } from './assign-to-preferred-module.component';

describe('AssignToPreferredModuleComponent', () => {
  let component: AssignToPreferredModuleComponent;
  let fixture: ComponentFixture<AssignToPreferredModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignToPreferredModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignToPreferredModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
