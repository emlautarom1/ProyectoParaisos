import { TestBed } from '@angular/core/testing';

import { TreeNamesService } from './tree-names.service';

describe('TreeNamesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TreeNamesService = TestBed.get(TreeNamesService);
    expect(service).toBeTruthy();
  });
});
