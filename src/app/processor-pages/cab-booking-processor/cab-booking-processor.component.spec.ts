import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabBookingProcessorComponent } from './cab-booking-processor.component';

describe('CabBookingProcessorComponent', () => {
  let component: CabBookingProcessorComponent;
  let fixture: ComponentFixture<CabBookingProcessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabBookingProcessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabBookingProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
