import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCheckerComponent } from './recipe-checker.component';

describe('RecipeCheckerComponent', () => {
  let component: RecipeCheckerComponent;
  let fixture: ComponentFixture<RecipeCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeCheckerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
