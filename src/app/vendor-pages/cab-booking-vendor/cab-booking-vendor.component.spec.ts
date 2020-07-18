import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabBookingVendorComponent } from './cab-booking-vendor.component';

describe('CabBookingVendorComponent', () => {
  let component: CabBookingVendorComponent;
  let fixture: ComponentFixture<CabBookingVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabBookingVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabBookingVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
