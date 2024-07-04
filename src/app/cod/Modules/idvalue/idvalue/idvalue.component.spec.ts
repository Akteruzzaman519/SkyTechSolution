import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IDValueComponent } from './idvalue.component';

describe('IDValueComponent', () => {
  let component: IDValueComponent;
  let fixture: ComponentFixture<IDValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IDValueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IDValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
