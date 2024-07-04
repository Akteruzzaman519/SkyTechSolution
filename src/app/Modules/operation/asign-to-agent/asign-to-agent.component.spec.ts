import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignToAgentComponent } from './asign-to-agent.component';

describe('AsignToAgentComponent', () => {
  let component: AsignToAgentComponent;
  let fixture: ComponentFixture<AsignToAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignToAgentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignToAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
