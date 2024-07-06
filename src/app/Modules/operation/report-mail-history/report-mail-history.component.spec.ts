import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMailHistoryComponent } from './report-mail-history.component';

describe('ReportMailHistoryComponent', () => {
  let component: ReportMailHistoryComponent;
  let fixture: ComponentFixture<ReportMailHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportMailHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportMailHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
