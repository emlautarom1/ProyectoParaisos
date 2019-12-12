import { TestBed } from '@angular/core/testing';

import { FormParserService } from './form-parser.service';

describe('FormParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormParserService = TestBed.get(FormParserService);
    expect(service).toBeTruthy();
  });
});
