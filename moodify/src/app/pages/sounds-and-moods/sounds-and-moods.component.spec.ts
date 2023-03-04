import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundsAndMoodsComponent } from './sounds-and-moods.component';

describe('SoundsAndMoodsComponent', () => {
  let component: SoundsAndMoodsComponent;
  let fixture: ComponentFixture<SoundsAndMoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoundsAndMoodsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoundsAndMoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
