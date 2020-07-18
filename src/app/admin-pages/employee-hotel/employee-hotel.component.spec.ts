import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeHotelComponent } from './employee-hotel.component';

describe('EmployeeHotelComponent', () => {
  let component: EmployeeHotelComponent;
  let fixture: ComponentFixture<EmployeeHotelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeHotelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
