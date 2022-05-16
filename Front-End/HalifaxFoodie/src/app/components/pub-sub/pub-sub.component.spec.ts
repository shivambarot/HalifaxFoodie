import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubSubComponent } from './pub-sub.component';

describe('PubSubComponent', () => {
  let component: PubSubComponent;
  let fixture: ComponentFixture<PubSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubSubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PubSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
