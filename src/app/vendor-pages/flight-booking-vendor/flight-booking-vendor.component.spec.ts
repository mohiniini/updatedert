import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightBookingVendorComponent } from './flight-booking-vendor.component';

describe('FlightBookingVendorComponent', () => {
  let component: FlightBookingVendorComponent;
  let fixture: ComponentFixture<FlightBookingVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightBookingVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightBookingVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
