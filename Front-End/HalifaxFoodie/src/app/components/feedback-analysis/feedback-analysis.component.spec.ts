import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackAnalysisComponent } from './feedback-analysis.component';

describe('FeedbackAnalysisComponent', () => {
  let component: FeedbackAnalysisComponent;
  let fixture: ComponentFixture<FeedbackAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
