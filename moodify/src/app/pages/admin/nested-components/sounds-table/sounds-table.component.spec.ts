import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundsTableComponent } from './sounds-table.component';

describe('SoundsTableComponent', () => {
  let component: SoundsTableComponent;
  let fixture: ComponentFixture<SoundsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoundsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoundsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
