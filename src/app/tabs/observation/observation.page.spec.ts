import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationPage } from './observation.page';

describe('ObservationPage', () => {
  let component: ObservationPage;
  let fixture: ComponentFixture<ObservationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
