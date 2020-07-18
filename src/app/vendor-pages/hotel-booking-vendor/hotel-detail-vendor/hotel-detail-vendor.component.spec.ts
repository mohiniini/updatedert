import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelDetailVendorComponent } from './hotel-detail-vendor.component';

describe('HotelDetailVendorComponent', () => {
  let component: HotelDetailVendorComponent;
  let fixture: ComponentFixture<HotelDetailVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelDetailVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelDetailVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
