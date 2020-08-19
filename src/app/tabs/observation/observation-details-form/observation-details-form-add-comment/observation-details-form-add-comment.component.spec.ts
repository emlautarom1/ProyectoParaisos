import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ObservationDetailsFormAddCommentComponent } from './observation-details-form-add-comment.component';

describe('ObservationDetailsFormAddCommentComponent', () => {
  let component: ObservationDetailsFormAddCommentComponent;
  let fixture: ComponentFixture<ObservationDetailsFormAddCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationDetailsFormAddCommentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ObservationDetailsFormAddCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
