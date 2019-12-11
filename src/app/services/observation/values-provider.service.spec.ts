import { TestBed } from '@angular/core/testing';

import { ValuesProviderService } from './values-provider.service';

describe('ValuesProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValuesProviderService = TestBed.get(ValuesProviderService);
    expect(service).toBeTruthy();
  });
});
