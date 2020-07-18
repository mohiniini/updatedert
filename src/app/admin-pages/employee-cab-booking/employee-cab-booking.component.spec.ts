import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCabBookingComponent } from './employee-cab-booking.component';

describe('EmployeeCabBookingComponent', () => {
  let component: EmployeeCabBookingComponent;
  let fixture: ComponentFixture<EmployeeCabBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeCabBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCabBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
