import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ObservationDetailsFormTreeNameComponent } from './observation-details-form-tree-name.component';

describe('ObservationDetailsFormTreeNameComponent', () => {
  let component: ObservationDetailsFormTreeNameComponent;
  let fixture: ComponentFixture<ObservationDetailsFormTreeNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationDetailsFormTreeNameComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ObservationDetailsFormTreeNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
