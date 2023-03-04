import { TestBed } from '@angular/core/testing';

import { BackgroundMoodService } from './background-mood.service';

describe('BackgroundMoodService', () => {
  let service: BackgroundMoodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackgroundMoodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
