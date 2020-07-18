import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelBookingVendorComponent } from './hotel-booking-vendor.component';

describe('HotelBookingVendorComponent', () => {
  let component: HotelBookingVendorComponent;
  let fixture: ComponentFixture<HotelBookingVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelBookingVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelBookingVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
