import { TestBed } from '@angular/core/testing';

import { FormValuesService } from './form-values.service';

describe('FormValuesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormValuesService = TestBed.get(FormValuesService);
    expect(service).toBeTruthy();
  });
});
