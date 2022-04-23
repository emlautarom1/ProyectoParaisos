import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionMapPage } from './region-map.page';

describe('RegionMapPage', () => {
  let component: RegionMapPage;
  let fixture: ComponentFixture<RegionMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegionMapPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
