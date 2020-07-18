import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelBookingProcessorComponent } from './hotel-booking-processor.component';

describe('HotelBookingProcessorComponent', () => {
  let component: HotelBookingProcessorComponent;
  let fixture: ComponentFixture<HotelBookingProcessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelBookingProcessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelBookingProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
