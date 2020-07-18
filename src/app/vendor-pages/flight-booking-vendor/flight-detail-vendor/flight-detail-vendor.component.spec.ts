import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDetailVendorComponent } from './flight-detail-vendor.component';

describe('FlightDetailVendorComponent', () => {
  let component: FlightDetailVendorComponent;
  let fixture: ComponentFixture<FlightDetailVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightDetailVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightDetailVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
