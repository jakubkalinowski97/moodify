import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundMoodComponent } from './background-mood.component';

describe('BackgroundMoodComponent', () => {
  let component: BackgroundMoodComponent;
  let fixture: ComponentFixture<BackgroundMoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackgroundMoodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgroundMoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
