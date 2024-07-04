import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMapInfoComponent } from './change-map-info.component';

describe('ChangeMapInfoComponent', () => {
  let component: ChangeMapInfoComponent;
  let fixture: ComponentFixture<ChangeMapInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeMapInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeMapInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
