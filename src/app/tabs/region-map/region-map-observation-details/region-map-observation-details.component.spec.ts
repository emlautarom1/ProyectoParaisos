import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegionMapObservationDetailsComponent } from './region-map-observation-details.component';

describe('RegionMapObservationDetailsComponent', () => {
  let component: RegionMapObservationDetailsComponent;
  let fixture: ComponentFixture<RegionMapObservationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionMapObservationDetailsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegionMapObservationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
