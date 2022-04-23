import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiPage } from './wiki.page';

describe('WikiPage', () => {
  let component: WikiPage;
  let fixture: ComponentFixture<WikiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WikiPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
