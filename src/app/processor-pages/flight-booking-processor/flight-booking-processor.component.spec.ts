import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightBookingProcessorComponent } from './flight-booking-processor.component';

describe('FlightBookingProcessorComponent', () => {
  let component: FlightBookingProcessorComponent;
  let fixture: ComponentFixture<FlightBookingProcessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightBookingProcessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightBookingProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
