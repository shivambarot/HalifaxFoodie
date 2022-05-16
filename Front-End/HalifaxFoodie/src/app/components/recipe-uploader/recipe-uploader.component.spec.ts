import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeUploaderComponent } from './recipe-uploader.component';

describe('RecipeUploaderComponent', () => {
  let component: RecipeUploaderComponent;
  let fixture: ComponentFixture<RecipeUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeUploaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
